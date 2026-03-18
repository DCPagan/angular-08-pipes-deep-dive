import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { TemperaturePipe } from './temperature.pipe';
import { K, R, C, F, TemperatureScale, tempUnit } from './temperature.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [DatePipe, TemperaturePipe]
})
export class AppComponent {
  currentDate = new Date();
  currentTemperaturs = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };

  historicTemperatures = [
    25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
  ];

  fromScale = signal<TemperatureScale>(C);
  toScale = signal<TemperatureScale>(F);
  toUnit = computed<string>(() => tempUnit[this.toScale()]);

  onReset(index: number) {
    this.historicTemperatures[index] = 18;
  }
}