import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const VAL = parseInt(value, 10);
    if (isNaN(VAL)) {
      throw new BadRequestException(
        `SERVER_MESSAGE: ${value} ins not an number.`,
      );
    }
    return VAL;
  }
}
