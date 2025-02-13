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

@Component({
  selector: 'app-smart-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSliderModule, MatInputModule],
  templateUrl: './smart-filter.component.html',
  styleUrls: ['./smart-filter.component.css']
})
export class SmartFilterComponent {

  selectedFilters: { id: number; label: string; select?: number }[] = [];
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

  areaFilters = {
    general: 0,
    living: 0,
    kitchen: 0
  };

  priceFilter = 0;
  pricePerM2Filter = 0;

  toggleFilter(option: { id: number; label: string }) {
    const index = this.selectedFilters.findIndex(f => f.id === option.id && !f.select);
    if (index > -1) {
      this.selectedFilters.splice(index, 1);
    } else {
      this.selectedFilters.push(option);
    }
  }

  removeFilter(filter: { id: number; label: string; select?: number }) {
    if (
      filter.select &&
      this.selectedDevelopers[filter.select] &&
      this.selectedDevelopers[filter.select]!.id === filter.id
    ) {
      this.selectedDevelopers[filter.select] = null;
    }
    this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
  }

  isFilterSelected(filterId: number): boolean {
    return this.selectedFilters.some(f => f.id === filterId);
  }

  onDeveloperChange(selectNumber: number, option: FilterOption | null) {
    this.selectedFilters = this.selectedFilters.filter(f => f.select !== selectNumber);
    this.selectedDevelopers[selectNumber] = option;
    if (option) {
      this.selectedFilters.push({ ...option, select: selectNumber });
    }
  }

  clearFilters(): void {
    this.selectedFilters = [];
    this.selectedDevelopers = { 1: null, 2: null };
    this.areaFilters = { general: 0, living: 0, kitchen: 0 };
    this.priceFilter = 0;
    this.pricePerM2Filter = 0;
  }

  onSubmit(): void {
    let message: string;
    if (this.selectedFilters.length === 0) {
      message = 'Нет выбранных фильтров.';
    } else {
      const filtersText = this.selectedFilters.map(f => f.label).join(', ');
      message = 'Выбранные фильтры: ' + filtersText;
    }
    // Вывод в консоль
    console.log(message);
    // Вывод в виде сообщения (alert)
    alert(message);
  }
}
