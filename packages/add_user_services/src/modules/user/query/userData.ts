import {  GraphQLString } from 'graphql';

const userData = {
  userData: {
    type: GraphQLString,
    resolve: (root: any, args: any, context: any) => {
   /*    console.log(context)
       */
      return 'context.user.name';
    },
  },
};
export default userData;    