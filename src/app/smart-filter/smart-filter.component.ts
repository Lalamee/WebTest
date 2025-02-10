import { Component } from '@angular/core';
import {MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-smart-filter',
  standalone: true,
  imports: [
    MatSliderModule
  ],
  templateUrl: './smart-filter.component.html',
  styleUrl: './smart-filter.component.css'
})
export class SmartFilterComponent {
  progressState: { [key: number]: boolean } = { 1: false, 2: false };

  toggleProgress(buttonId: number) {
    this.progressState[buttonId] = !this.progressState[buttonId];
  }
}
