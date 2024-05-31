import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FoodItem } from 'src/app/data/food-item';
import { AddPantryItemModalComponent } from 'src/app/components/add-pantry-item-modal/add-pantry-item-modal.component';


@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.page.html',
  styleUrls: ['./pantry.page.scss'],
})
export class PantryPage implements OnInit {
  private pantryItems: FoodItem[] = [];

  constructor(private mc:ModalController) {}

  ngOnInit() {
  }

  async addPantryItem(){
    const modal = await this.mc.create({
      component: AddPantryItemModalComponent
    });
    modal.present();

    const{data, role} = await modal.onWillDismiss();

    if (role === 'confirm'){
      // add foodItem from modal to pantryItems array
      this.pantryItems.push(data);
    }
  }


}
