import { Pipe, PipeTransform } from '@angular/core';

type Order = 'asc' | 'desc'

@Pipe({
  name: 'sort',
  standalone: true,
  pure: false
})
export class SortPipe implements PipeTransform {
  transform(value: number[], order?: Order): number[] {
    const comparator: (a: number, b: number) => number =
      order === 'desc' ? (a, b) => b - a : (a, b) => a - b;
    return [...value as number[]].sort(comparator);
  }
}