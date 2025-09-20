import { Component, inject } from '@angular/core';
import { StoreService } from '../../../services';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-filters',
  imports: [CommonModule, FormsModule, MatInputModule, MatCheckboxModule],
  templateUrl: './post-filters.component.html',
  standalone: true,
})
export class PostFiltersComponent {
  private store = inject(StoreService);

  public users = this.store.users;

  get searchTerm(): string {
    return this.store.postFilters().searchTerm;
  }
  set searchTerm(value: string) {
    this.store.postFilters.update((f) => ({ ...f, searchTerm: value }));
  }

  get selectedUserId(): number | null {
    return this.store.postFilters().selectedUserId;
  }
  set selectedUserId(value: number | null) {
    this.store.postFilters.update((f) => ({ ...f, selectedUserId: value }));
  }

  get showFavoritesOnly(): boolean {
    return this.store.postFilters().showFavoritesOnly;
  }
  set showFavoritesOnly(value: boolean) {
    this.store.postFilters.update((f) => ({ ...f, showFavoritesOnly: value }));
  }
}
