import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';

interface FilterOption {
  id: number;
  label: string;
}

interface Filter {
  title: string;
  options: FilterOption[];
  isSelect?: boolean;
}

interface SelectedFilter {
  id: number;
  label: string;
  select?: number;
}

export enum SliderData {
  MinPriority = 0,
  MaxPriority = 10,
  StepPriority = 1,

  MinFloor = 1,
  MaxFloor = 50,
  StepFloor = 1,

  MinGeneral = 10,
  MaxGeneral  = 300,
  StepGeneral  = 10,

  MinLiving = 10,
  MaxLiving = 300,
  StepLiving = 10,

  MinKitchen = 10,
  MaxKitchen = 100,
  StepKitchen = 10,

  MinPrice = 100000,
  MaxPrice = 100000000,
  StepPrice = 100000,

  MinPricePerM2 = 10000,
  MaxPricePerM2 = 1000000,
  StepPricePerM2 = 1000
}

@Component({
  selector: 'app-smart-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSliderModule, MatInputModule],
  templateUrl: './smart-filter.component.html',
  styleUrls: ['./smart-filter.component.css']
})
export class SmartFilterComponent {
  selectedFilters: SelectedFilter[] = [];
  selectedDevelopers: { [key: number]: FilterOption | null } = { 1: null, 2: null };
  developerSelectNumbers = [1, 2];

  filters: Filter[] = [
    {
      title: 'Тип жилья',
      options: [
        { id: 1, label: 'Квартира' },
        { id: 2, label: 'Апартаменты' }
      ]
    },
    {
      title: 'Планировка',
      options: [
        { id: 3, label: 'Смежная' },
        { id: 4, label: 'Раздельная' }
      ]
    },
    {
      title: 'Этаж',
      options: [
        { id: 5, label: 'Не первый' },
        { id: 6, label: 'Не последний' },
        { id: 7, label: 'Только последний' }
      ]
    },
    {
      title: 'Этажей в доме',
      isSelect: true,
      options: [
        { id: 8, label: 'АО СЗ ФК "АКСИОМА"' },
        { id: 9, label: 'ООО Предприятие «ИП К.И.Т.»' },
        { id: 10, label: 'ООО "СТЭЛ инвест"' }
      ]
    }
  ];

  areaFilters: { general: string; living: string; kitchen: string } = {
    general: '',
    living: '',
    kitchen: ''
  };

  priceFilter: string = '';
  pricePerM2Filter: string = '';
  floorFilter: string = '';
  houseFloorsFilter: string = '';

  toggleFilter(option: FilterOption): void {
    const index = this.selectedFilters.findIndex(f => f.id === option.id && f.select === undefined);
    if (index > -1) {
      this.selectedFilters.splice(index, 1);
    } else {
      this.selectedFilters.push(option);
    }
  }

  removeFilter(filter: SelectedFilter): void {
    if (filter.select && this.selectedDevelopers[filter.select]?.id === filter.id) {
      this.selectedDevelopers[filter.select] = null;
    }
    this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
  }

  isFilterSelected(filterId: number): boolean {
    return this.selectedFilters.some(f => f.id === filterId);
  }

  onDeveloperChange(selectNumber: number, option: FilterOption | null): void {
    this.selectedFilters = this.selectedFilters.filter(f => f.select !== selectNumber);
    this.selectedDevelopers[selectNumber] = option;
    if (option) {
      this.selectedFilters.push({ ...option, select: selectNumber });
    }
  }

  clearFilters(): void {
    this.selectedFilters = [];
    this.selectedDevelopers = { 1: null, 2: null };
    this.areaFilters = { general: '', living: '', kitchen: '' };
    this.priceFilter = '';
    this.pricePerM2Filter = '';
    this.floorFilter = '';
    this.houseFloorsFilter = '';
  }

  onSubmit(): void {
    const message = this.selectedFilters.length === 0
      ? 'Нет выбранных фильтров.'
      : 'Выбранные фильтры: ' + this.selectedFilters.map(f => f.label).join(', ');
    console.log(message);
    alert(message);
  }

  updateRangeFilter(id: number, name: string, value: any): void {
    const index = this.selectedFilters.findIndex(f => f.id === id);
    if (value === '' || value === null) {
      if (index > -1) {
        this.selectedFilters.splice(index, 1);
      }
      return;
    }
    const numericValue = +value;
    const filterLabel = `${name}: ${numericValue}`;
    if (index > -1) {
      this.selectedFilters[index].label = filterLabel;
    } else {
      this.selectedFilters.push({ id, label: filterLabel });
    }
  }

  protected readonly SliderData = SliderData;
}
