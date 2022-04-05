const sharedService = require('../../shared/shared.service')
const paymentService = require('./payment.repository');
const walletService = require('../../modules/wallet/wallet.service');
const transactionService = require('../../modules/transaction/');
class PaymentService {
  async getPayment(id) {
    const { data: payment } = await this.sharedService.queryHandler(
      paymentRepository.findUnique({ where: { id } }),
      true,
    );
    return payment;
  }

  async getPayments(filter) {
    const { data: payment } = await this.sharedService.queryHandler(
      paymentRepository.findMany({ where: { ...filter } }),
      true,
    );
    return payment;
  }

  async inboundPayment(data) {
    //     Web hook (VA, ACH,PAD, SEPA,WISE)
    const { account_ref: account_reference, account_number } = data;

    if (account_number || account_reference) {
      return await this.inboundAccountFunded(data);
    } else {
      return await this.inboundSelfFunded(data);
    }
  }

  async update(id, data) {
    return await this.sharedService.queryHandler(
      paymentRepository.update({ where: { id }, data }),
    );
  }

  async createPayment(data) {
    const {
      currency,
      total_amount,
      raenest_fee,
      company_id,
      amount,
      tran_ref,
    } = data;
    const { data: payment } = await this.sharedService.queryHandler(
      paymentRepository.create({
        data: {
          currency,
          total_amount,
          raenest_fee,
          company_id,
          tran_ref,
          amount,
        },
      }),
    );

    return { data: payment };
  }

  async inboundAccountFunded(inboundData) {
    const {
      currency,
      amount,
      provider_ref,
      account_ref: account_reference,
      account_number,
      status,
      description,
    } = inboundData;
    const amount_funded = this.sharedService.formatAmount(amount);
    //get corresponding virtual account
    const { data: virtual_account } =
      await this.virtualAccountService.getVirtualAccountById({
        account_reference,
        account_number,
      });
    if (!virtual_account) throw new RNBadRequestException({});
    const {
      currency: va_currency,
      user_id,
      company_id,
      account_name,
    } = virtual_account;
    //get user/company wallets with same currency
    const {
      data: { records: wallets },
    } = await this.walletService.findAll({
      user_id,
      company_id,
    });
    const { id: wallet_id } = wallets.find(
      (wallet) => wallet.currency === va_currency,
    );
    //check if transaction exist and change status to successful
    const { data: transaction } = await this.transactionService.findOne(
      provider_ref,
    );

    if (transaction) {
      //check if amount has been altered
      if (
        this.sharedService.formatAmount(transaction.total_amount) !==
        amount_funded
      )
        throw new RNBadRequestException({ message: 'amount mismatch' });

      if (
        transaction.provider_ref === provider_ref &&
        transaction.status === TransactionStatus.SUCCESS
      )
        //check transaction and prevent double credit
        return { data: { duplicate: true } };
      //fund wallet
      const wallet_funded = await this.walletService.creditWallet(wallet_id, {
        amount: amount_funded,
      });
      if (wallet_funded) {
        //update transaction
        await this.transactionService.updateTransactionStatus(provider_ref, {
          status:
            status === TransactionStatus.SUCCESS
              ? TransactionStatus.SUCCESS
              : TransactionStatus.FAILED,
        });

        return { data: {} };
      }
    } else {
      //fund wallet and create credit transaction
      const wallet_funded = await this.walletService.creditWallet(wallet_id, {
        amount: amount_funded,
      });
      if (wallet_funded) {
        const transaction = {
          amount: amount_funded,
          charges: 0,
          description,
          status: TransactionStatus.SUCCESS,
          category: TransactionCategory.FUNDWALLET,
          currency,
          provider_ref,
          channel: PaymentChannel.TRANSFER,
          type: TransactionType.CREDIT,
          wallet_id,
          sender_name: 'Wallet top up',
          receiver_name: account_name,
          receiver_currency: va_currency,
          receiver_amount: amount,
        };
        await this.transactionService.create([transaction]);
        return { data: {} };
      }
    }
    throw new RNBadRequestException({});
  }
}

module.exports = new PaymentService();