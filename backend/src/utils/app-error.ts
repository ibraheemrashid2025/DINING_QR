import { HttpStatus } from '../constants/http-status';

export class AppError extends Error {
  public readonly statusCode: number;

  public readonly details?: unknown;

  public constructor(message: string, statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
