/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { unauthorizedError } from './errorMessages';

export class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>) {
        const { resolve = defaultFieldResolver, name } = field;
        field.resolve = async function (src, args, ctx, info) {
            if (!ctx.userId) return unauthorizedError(name);
            return await resolve(src, args, ctx, info);
        };
    }
}
