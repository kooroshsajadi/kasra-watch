import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'literalStatus'})
export class LiteralStatus implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return "عادی";
      case 1:
        return "بحرانی";
      case 2:
        return "دارای هشدار";
     }
  }
}