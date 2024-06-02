import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FoodItem } from 'src/app/data/food-item';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  standalone: true,
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class ShoppingListComponent  implements OnInit {
  // @Input({required: true}) public shoppingList!: Array<FoodItem>;
  public shoppingList!: Array<FoodItem>;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    console.log(this.shoppingService.getShoppingList());
    this.shoppingList = this.shoppingService.getShoppingList();
  }

  public getShoppingList() {
    return this.shoppingService.getShoppingList();
  }

  public isEmpty(): boolean {
    return this.shoppingList.length == 0;
  }
}
