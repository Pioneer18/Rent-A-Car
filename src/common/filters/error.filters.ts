import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { DateTime } from 'luxon';
/**
 * **summary**: this Error Filter catches all 500 INTERNAL_SERVER_ERRORs. It logs the Error, reveals the Error object, and reutrns a custom err message to the client
 */
@Catch()
export class ErrorFilter implements ExceptionFilter {
  /**
   * **summary**: catch http errors and use the Logger to log the appropiate error and data
   * @param error 
   * @param host 
   */
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const request = host.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = DateTime.local();

    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const err = {
      message: error.message,
      name: error.name,
      teehee: `have a nice day :)`,
    };
    const log = {
      method: `${method}`,
      url: `${url}`,
      DateTime: `${now.month}/${now.day} Time: ${now.hour}:${now.minute}:${
        now.second
      }`,
      stack: `${error.stack}`,
    };

    switch (status) {
      case HttpStatus.INTERNAL_SERVER_ERROR:
      case HttpStatus.BAD_REQUEST:
        if (process.env.NODE_ENV === 'production') {
          Logger.error(error);
          return response.status(status).json(err);
        } else {
          Logger.error(err);
          Logger.log(log);
          return response.status(status).json(err);
        }
    }
  }
}
