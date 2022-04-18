import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isMongoId} from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if(!isMongoId(value)) {
      throw new BadRequestException(
        `SERVER_MESSAGE: ${value} is not a Mongo ID.`,
      );
    }
    return value;
  }
}
