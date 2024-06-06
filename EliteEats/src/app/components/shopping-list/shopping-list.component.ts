import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FoodItem } from 'src/app/data/food-item';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  standalone: true,
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ShoppingListComponent  implements OnInit {
  // @Input({required: true}) public shoppingList!: Array<FoodItem>;
  public shoppingList!: Array<FoodItem>;
  public selectedItems: Array<boolean> = [];

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    console.log(this.shoppingService.getShoppingList());
    this.shoppingList = this.shoppingService.getShoppingList();

    for (let _ = 0; _ < this.shoppingList.length; _++) {
      this.selectedItems.push(false);
    }
    console.log(this.selectedItems);
  }

  public getShoppingList() {
    return this.shoppingService.getShoppingList();
  }

  public isEmpty(): boolean {
    return this.shoppingList.length == 0;
  }

  updateSelection(index: number) {
    console.log(this.selectedItems);
    // this.selectedItems[index] = !this.selectedItems[index]
  }

  selectAll() {
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.selectedItems[i] = true;
    }
  }
}
