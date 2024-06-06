import { Injectable } from '@angular/core';
import { FoodItem } from '../data/food-item';

@Injectable({
  providedIn: 'root'
})
export class ExpirationService {
  private itemsTracked: FoodItem[] = [];

  constructor() { }

  public trackItem(item: FoodItem): void{
    this.itemsTracked.push(item);
  }

  public removeItemTracking(item: FoodItem): void {
    this.itemsTracked.splice(this.itemsTracked.indexOf(item), 1);
  }

  public getItemsTracked(): FoodItem[]{
    return this.itemsTracked;
  }

  public isItemTracked(item: FoodItem): boolean {
    return this.itemsTracked.includes(item);
  }
}
