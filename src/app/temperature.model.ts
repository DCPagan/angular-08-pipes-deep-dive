
export enum TemperatureScale {
  Kelvin, Rankine, Celsius, Fahrenheit
}

export const K = TemperatureScale.Kelvin;
export const R = TemperatureScale.Rankine;
export const C = TemperatureScale.Celsius;
export const F = TemperatureScale.Fahrenheit;

export const tempUnit: Record<TemperatureScale, string> = {
  [K]: 'K',
  [R]: ' °R',
  [C]: ' °C',
  [F]: ' °F',
};