import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/data/food-item';
import { ShoppingService } from 'src/app/services/shopping.service';
import { AddPantryItemModalComponent } from 'src/app/components/modals/add-pantry-item-modal/add-pantry-item-modal.component';
import { ModalController } from '@ionic/angular';

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
      component: AddPantryItemModalComponent
    });
    modal.present();

    const{data, role} = await modal.onWillDismiss();

    if (role === 'confirm'){
      // add foodItem from modal to organized pantryItems map
      
    }
  }

}
