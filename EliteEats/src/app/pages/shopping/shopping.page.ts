import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/data/food-item';
import { ShoppingService } from 'src/app/services/shopping.service';
import { ModalController } from '@ionic/angular';
import { AddItemComponent } from 'src/app/components/modals/add-item/add-item.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {

  constructor(private shoppingService: ShoppingService, private mc: ModalController) { }

  ngOnInit() {
  }

  // Method to get Shopping List
  public getShoppingList(): Array<FoodItem> {
    return this.shoppingService.getShoppingList();
  }

  // show modal
  async addShoppingItem(){
    const modal = await this.mc.create({
      component: AddItemComponent,
      componentProps: {
        type : "Shopping list"
      }
    });
    modal.present();

    const{data, role} = await modal.onWillDismiss();

    if (role === 'confirm'){
      // add foodItem from modal to organized pantryItems map
      
    }
  }

}
