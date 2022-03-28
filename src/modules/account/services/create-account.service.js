// import { accountRepository } from '../account.repository';
// import { UserRegistrationDto } from '../dtos/account.dto';

// const userRegistration = async (data: UserRegistrationDto): Promise<{ authData: object; message: string }> => {
//   const { email } = data;
//   const isAccountExisting = await accountRepository.findFirst({
//     where: {
//       OR: [{ email }],
//     },
//   });
//   if (isAccountExisting) {
//     throw new Error('This email is taken');
//   }
//   const details = UserEntity.selectEmployeeDetails();
//   const createAccount = await accountRepository.create({
//     data: {
//       email,
//       ...data,
//     },
//     select: details,
//   });
//   if (!createAccount) {
//     throw new Error('Request was not successful, try again later');
//   }
//   return { authData: createAccount, message: 'Employee account was created successfully' };
// };

// module.exports = userRegistration ;
