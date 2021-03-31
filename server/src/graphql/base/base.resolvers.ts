import { Resolvers } from '@gql/types';
import { GraphQLScalarType, Kind } from 'graphql';
export const resolvers: Resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date',
        serialize(value) {
            return value.getTime();
        },
        parseValue(value) {
            console.log(value);
            return new Date(value);
        },
        parseLiteral(ast) {
            console.log(ast);
            if (ast.kind === Kind.INT) {
                return new Date(parseInt(ast.value, 10));
            }
            return null;
        },
    }),
    Custom: new GraphQLScalarType({
        name: 'Custom',
        description: 'Some Desccc',
        serialize() {
            return 'CUSSS';
        },
    }),
};
