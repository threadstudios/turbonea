import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserDecorator = (
  data: unknown,
  context: ExecutionContext,
): boolean => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
};
export const CurrentUser = createParamDecorator(CurrentUserDecorator);
