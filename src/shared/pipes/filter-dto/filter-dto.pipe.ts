import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FilterDtoPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof(value) !== 'object') return value;
    return new value.constructor(value);
  }
}
