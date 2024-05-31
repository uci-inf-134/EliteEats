import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
// import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FoodItem } from 'src/app/data/food-item';
import { AddPantryItemModalComponent } from 'src/app/components/add-pantry-item-modal/add-pantry-item-modal.component';


@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.page.html',
  styleUrls: ['./pantry.page.scss'],
})
export class PantryPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  public addedItemName:String = '';
  private pantryItems: Map<string, FoodItem[]> = new Map();
  
  public readonly categories: string[] = FoodItem.categories;

  constructor(private mc:ModalController) {}

  ngOnInit() {
  }

  public addItem() {
    console.log(this.addedItemName);
    this.modal.dismiss(null, 'cancel');
  }

  async addPantryItem(){
    const modal = await this.mc.create({
      component: AddPantryItemModalComponent
    });
    modal.present();

    const{data, role} = await modal.onWillDismiss();

    if (role === 'confirm'){
      // add foodItem from modal to organized pantryItems map
      this.addToCategory(data);
    }
  }

  private addToCategory(item: FoodItem){
    if (!this.pantryItems.has(item.category)){
      this.pantryItems.set(item.category, []);
    }
    this.pantryItems.get(item.category)!.push(item);
  }

  get pantryIsOccupied(){ 
    return this.pantryItems.size > 0 ? true : false; 
  }

  public pantryHasCategory(category: string): boolean {
    return this.pantryItems.has(category) && this.pantryItems.get(category)!.length > 0;
  }

  public getItemsByCategory(category: string): FoodItem[] {
    return this.pantryItems.get(category) || [];
  }
}
