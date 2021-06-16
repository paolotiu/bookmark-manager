import { Resolvers } from '@graphql/generated/graphql';
import { GraphQLScalarType, Kind } from 'graphql';

export const sharedResolvers: Resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date',
        serialize(value) {
            return value.getTime();
        },
        parseValue(value) {
            return new Date(value);
        },
        parseLiteral(ast) {
            // eslint-disable-next-line react/destructuring-assignment
            if (ast.kind === Kind.INT) {
                return new Date(parseInt(ast.value, 10));
            }
            return null;
        },
    }),
};
