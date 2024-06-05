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
  public addItemToList(item: FoodItem): void {
    this.shoppingList.push(item);
  }

  // Method to get Entire List
  public getShoppingList(): Array<FoodItem> {
    return this.shoppingList;
  }

  // Returns T/F if item is in shopping list
  public itemIsInList(item: FoodItem): boolean {
    return this.shoppingList.includes(item);
  }
}
