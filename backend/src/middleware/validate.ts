import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';

type RequestSchema = AnyZodObject | z.ZodEffects<AnyZodObject>;

export function validate(schema: RequestSchema) {
  return (request: Request, _response: Response, next: NextFunction) => {
    const parsed = schema.parse({
      body: request.body,
      query: request.query,
      params: request.params,
    });

    request.body = parsed.body;
    request.query = parsed.query;
    request.params = parsed.params;

    next();
  };
}

