import { Injectable } from '@angular/core';
import { FoodItem } from '../data/food-item';
import { PantryPage } from '../pages/pantry/pantry.page';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PantryService {
  private pantryItems: Map<string, FoodItem[]> = new Map();

  constructor() {}

  getPantryList(): Map<string, FoodItem[]> {
    return this.pantryItems;
  }

  addPantryItem(category: string, item: FoodItem) {
    if (!this.pantryItems.has(category)) {
      this.pantryItems.set(category, []);
    }
    this.pantryItems.get(category)?.push(item);
  }

  removePantryItem(category: string, item: FoodItem) {
    if (this.pantryItems.has(category)) {
      const items = this.pantryItems.get(category)!.filter(i => i !== item);
      if (items.length > 0) {
        this.pantryItems.set(category, items);
      }
      else {
        this.pantryItems.delete(category);
      }
    }
  }

  clearPantry() {
    this.pantryItems.clear();
  }
}
