import { Injectable, OnInit } from '@angular/core';
import { FoodItem } from '../data/food-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService implements OnInit {
  private shoppingList: Array<FoodItem> = [];

  constructor() { }

  ngOnInit(): void {
  }

  // Method to Add Item to Shopping List
  public addItem(item: FoodItem): void {
    this.shoppingList.push(item);
  }

  // Method to Remove Item from Shopping List
  public removeItem(item: FoodItem): void {
    this.shoppingList = this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
  }

  // Method to get Entire List
  public getShoppingList(): Array<FoodItem> {
    return this.shoppingList;
  }

  public itemIsInList(item: FoodItem): boolean {
    // Returns T/F if item is in shopping list
    return this.shoppingList.includes(item);
  }
}
