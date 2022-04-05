
const sharedService = require('../../shared/shared.service')
const walletRepository = require('./wallet.repository');
class WalletService {
  async createWallet(data){
   return await sharedService.queryHandler(walletRepository.create(data));
  }
  async fundWallet(){}
  async withdraw(){}
  async getBalance(){}
  async convertCurrency(){}
  async debitWallet(){}
  async findAll(){}
  async findOne(){}
}

module.exports = new WalletService()