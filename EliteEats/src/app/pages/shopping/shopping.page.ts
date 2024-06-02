import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/data/food-item';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
  }

  // Method to get Shopping List
  public getShoppingList(): Array<FoodItem> {
    return this.shoppingService.getShoppingList();
  }

}
