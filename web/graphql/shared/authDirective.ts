import { getDirectives, MapperKind, mapSchema } from 'graphql-tools';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { unauthorizedError } from './errorMessages';

export const authDirective = (name: string) => {
    return {
        authDirectiveTransformer: (schema: GraphQLSchema) =>
            mapSchema(schema, {
                [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
                    const directives = getDirectives(schema, fieldConfig);
                    if (directives[name]) {
                        const { resolve = defaultFieldResolver } = fieldConfig;

                        // eslint-disable-next-line no-param-reassign
                        fieldConfig.resolve = async function tester(src, args, ctx, info) {
                            if (!ctx.userId) return unauthorizedError(name);
                            return resolve(src, args, ctx, info);
                        };
                    }
                    return fieldConfig;
                },
            }),
    };
};
