import UserModel from '../modules/auth/UserModel';

export const createUser = async () => {
  const name = 'user';
  const email = 'roots@gola.com';
  const password = '14589632Je11.';

  const user = await UserModel.findOne({email});

  if (user) {
    return user;
  }

  return new UserModel({
    name,
    email,
    password,
  }).save();
};
