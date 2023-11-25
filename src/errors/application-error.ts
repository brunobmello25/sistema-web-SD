import httpStatus from "http-status";

export class ApplicationError extends Error {
  public readonly statusCode: number;

  constructor(message: string, code: number = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = "ApplicationError";
    this.statusCode = code;
  }
}
