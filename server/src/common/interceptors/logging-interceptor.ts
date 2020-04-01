import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DateTime } from 'luxon';

/**
 * Interceptors capabilities:
 * wraps the request/response stream so we can bind extra logic before / after method execution
 * transform the result returned from a function
 * extend the basic function behavior
 * completely override a function depending on specific conditions
 * Aspect Interception: log user interaction (e.g. storing user calls, async dispatching events, calculating a timestamp)
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const now = DateTime.local();

    return next.handle().pipe(
      // calls Logger method upon graceful or exceptional termination of the observable stream
      tap(err => {
        Logger.log(
          `${method} ${url} Date: ${now.month}/${now.day} Time: ${now.hour}:${
            now.minute
          }:${now.second}`,
          `${context.getClass().name}.${context.getHandler().name}`,
        );
      }),
    );
  }
}
