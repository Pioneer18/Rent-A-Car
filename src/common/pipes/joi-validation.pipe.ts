import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';
import { Schema } from '@hapi/joi';

/**
 * This class accepts a joi validationSchema when instantiated
 * It will validate an incoming value aginst the provided validation schema
 */
@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      Logger.error(error);
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
