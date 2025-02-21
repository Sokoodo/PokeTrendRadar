import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FiltersManagerService } from '../../services/filters-manager.service';

@Component({
  selector: 'app-filters-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule,
    MatSelectModule, MatOptionModule, MatIconModule, MatButtonModule],
  templateUrl: './filters-bar.component.html',
  styleUrl: './filters-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FiltersBarComponent {
  @Input() placeholderText: string = 'Search...';
  @Input() filters: { label: string; value: string }[] = [];
  @Input() filtersType: string = '';
  @Output() searchEvent = new EventEmitter<string>();
  @Output() filterEvent = new EventEmitter<string>();

  private _filtersService = inject(FiltersManagerService);

  loading: boolean;
  searchQuery: string;

  constructor() {
    this.loading = false;
    this.searchQuery = "";
  }

  onSearch(): void {
    this.searchEvent.emit(this.searchQuery);
  }

  onFilterChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.filterEvent.emit(selectedValue);
  }

  startScraping(filtersType: string) {
    this._filtersService.startLoading();
    this._filtersService.startScraping(filtersType).subscribe({
      next: (data) => {
        console.log(data)
        this._filtersService.stopLoading();
      },
      error: (err) => {
        console.error('Error fetching product details', err);
        this._filtersService.stopLoading();
      }
    });
  }
}
