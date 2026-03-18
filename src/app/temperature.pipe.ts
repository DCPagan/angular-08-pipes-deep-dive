import { Pipe, PipeTransform } from '@angular/core';
import { TemperatureScale, K, R, C, F, tempUnit } from './temperature.model';

const KelvinFreezing = 273.15;
const RankineFreezing = 9 / 5 * KelvinFreezing;
const FahrenheitFreezing = 32;
const FZeroR = RankineFreezing - FahrenheitFreezing;

/**
 * Embed a tuple of numeric enums from 0 to 3 to a number for pattern matching.
 * @param from enum
 * @param to enum
 * @returns unique natural number for pattern matching
 */
function embedTuple(from: TemperatureScale, to: TemperatureScale) {
  return 4 * from + to;
}

function convertTemperature(value: number, from: TemperatureScale, to: TemperatureScale) {
  switch (embedTuple(from, to)) {
    case embedTuple(K, K): {
      return value;
    }
    case embedTuple(K, R): {
      return 9 / 5 * value;
    }
    case embedTuple(K, C): {
      return value - KelvinFreezing;
    }
    case embedTuple(K, F): {
      return 9 / 5 * value - FZeroR;
    }
    case embedTuple(R, K): {
      return 5 / 9 * value;
    }
    case embedTuple(R, R): {
      return value;
    }
    case embedTuple(R, C): {
      return 5 / 9 * value - KelvinFreezing;
    }
    case embedTuple(R, F): {
      return value - FZeroR;
    }
    case embedTuple(C, K): {
      return value + KelvinFreezing;
    }
    case embedTuple(C, R): {
      return 9 / 5 * (value + KelvinFreezing);
    }
    case embedTuple(C, C): {
      return value;
    }
    case embedTuple(C, F): {
      return 9 / 5 * value + FahrenheitFreezing;
    }
    case embedTuple(F, K): {
      return 5 / 9 * (value + FZeroR);
    }
    case embedTuple(F, R): {
      return value + FZeroR;
    }
    case embedTuple(F, C): {
      return 5 / 9 * (value - FahrenheitFreezing);
    }
    case embedTuple(F, F): {
      return value;
    }
    default: {
      return value;
    }
  }
}

/**
 * Convert a temperature measurement to a different scale.
 *
 * @param value Temperature measurement.
 * @param from Temperature scale of the input.
 * @param to Temperature scale of the output.
 * @param scale Scale of the output after the decimal point, defaulting to 2.
 * @return Converted temperature.
 */
@Pipe({
  name: 'temp',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: number,
    from: TemperatureScale,
    to?: TemperatureScale,
    scale?: number): string {
    return (to ? convertTemperature(value, from, to) : value)
      .toFixed(scale ?? 2) + tempUnit[to ?? from];
  }
}