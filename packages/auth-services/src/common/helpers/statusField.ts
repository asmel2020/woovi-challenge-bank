import { GraphQLString } from 'graphql';

const successField = {
  success: {
    type: GraphQLString,
    description: 'Default success field resolver.',
    resolve: ({ success }: any) => success,
  },
};

const errorsField = {
  error: {
    type: GraphQLString,
    description: 'Default errors field resolver.',
    resolve: ({ error }: { error: string | null }) => error,
  },
};
export { successField, errorsField };
