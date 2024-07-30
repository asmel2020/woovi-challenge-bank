import { UserType } from '@bank/models';

export const userDataQuery: any = {
  type: UserType,
  resolve: async (root: any, _: any, context: any) => {
    if (!context.user)
      return {
        error: 'Not authorized'
      };

    return { name: context.user.name, email: context.user.email, balance: context.user.balance };
  }
};
