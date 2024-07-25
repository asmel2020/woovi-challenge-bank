import { GraphQLNonNull, GraphQLString } from 'graphql';
import { errorsField, successField } from '../../../common/helpers';
import { mutationWithClientMutationId } from 'graphql-relay';
import { loginUser } from '../../../common/schema';
import { Args ,IContext,IRequest} from '../../../common/interfaces';
import pubSub, { EVENTS } from '../../../common/helpers/pubSub';

export default mutationWithClientMutationId({
  name: 'userLogin',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: Omit<Args, 'name'>, context: IContext) => {


   /*  await pubSub.publish(`${EVENTS.POST.NEW}.${args.email}`, { id: args.email }); */
    return loginUser(args, context)
  },

  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }: any) => token,
    },
    ...successField,
    ...errorsField,
  },
});
