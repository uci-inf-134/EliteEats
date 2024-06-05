import { Injectable, OnInit } from '@angular/core';
import { FoodItem } from '../data/food-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService implements OnInit {
  private shoppingList: Map<string, FoodItem[]> = new Map();

  constructor() { }

  ngOnInit(): void {
  }

  // Method to Add Item to Shopping List
  public addItem(item: FoodItem, category: string): void {
    if (!this.shoppingList.has(category)) {
      this.shoppingList.set(category, []);
    }
    this.shoppingList.get(category)?.push(item);
  }

  // Method to Remove Item from Shopping List
  public removeItem(item: FoodItem, category: string): void {
    if (this.shoppingList.has(category)) {
      const items = this.shoppingList.get(category)!.filter(i => i !== item);
      if (items.length > 0) {
        this.shoppingList.set(category, items);
      }
      else {
        this.shoppingList.delete(category);
      }
    }
  }

  // Method to get Entire List
  public getShoppingList(): Map<string, FoodItem[]> {
    return this.shoppingList;
  }

  public itemIsInList(item: FoodItem): boolean {
    for (let items of this.shoppingList.values()) {
      if (items.includes(item)) {
        return true;
      }
    }
    return false;
  }
}
