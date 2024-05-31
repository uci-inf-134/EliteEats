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
  
  public itemSelected: number = 0;
  public allSelected: boolean = false;
  public toolbar: string = 'pantry'; // default toolbar vs selected toolbar
  
  public readonly categories: string[] = FoodItem.categories;

  constructor(private mc:ModalController) {}

  ngOnInit() {
    /** STATIC DATA FOR TESTING */
    const itemData = [
      { name: 'Apple', category: 'Fruits', expirationDate: new Date('2024-06-30') },
      { name: 'Banana', category: 'Fruits', expirationDate: new Date('2024-06-30') },
      { name: 'Spinach', category: 'Vegetables', expirationDate: new Date('2024-06-25') },
      { name: 'Milk', category: 'Dairy', expirationDate: new Date('2024-06-28') },
      { name: 'Beef', category: 'Meats', expirationDate: new Date('2024-07-02') },
      { name: 'Salmon', category: 'Seafood', expirationDate: new Date('2024-07-05') },
      { name: 'Rice', category: 'Grains and Cereals', expirationDate: new Date('2024-07-10') },
      { name: 'Bread', category: 'Bread and Bakery', expirationDate: new Date('2024-07-12') },
      { name: 'Pasta', category: 'Pantry Goods', expirationDate: new Date('2024-07-15') },
      { name: 'Ice Cream', category: 'Frozen Foods', expirationDate: new Date('2024-07-20') },
      { name: 'Orange Juice', category: 'Beverages', expirationDate: new Date('2024-07-25') },
      { name: 'Chips', category: 'Snacks', expirationDate: new Date('2024-07-28') },
      { name: 'Ketchup', category: 'Condiments', expirationDate: new Date('2024-08-01') },
      { name: 'Salt', category: 'Seasonings', expirationDate: new Date('2024-08-05') },
      { name: 'Olive Oil', category: 'Oils and Vinegars', expirationDate: new Date('2024-08-10') },
    ];

    itemData.forEach(data => {
      const fi = new FoodItem(data.name, data.category, data.expirationDate);
      this.addToCategory(fi);
    });

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

  public updateSelection(item: FoodItem){
    // change checked status from previous state
    // selected --> non-selected, non-selected --> selected
    item.selected != item.selected;

    // if item is selected, add to counter
    item.selected ? this.itemSelected++ : this.itemSelected--;

    // Check if list contains at least 1 selected option (used to know if other menu should be shown)
    console.log(this.itemSelected);
  }

  public selectAll(state: boolean): void {
    this.pantryItems.forEach((itemsArray: FoodItem[]) => {
      FoodItem.selectedAll(itemsArray, state);
    })
    this.allSelected = state;

    // update count of selected entries
    this.itemSelected = this.pantryItems.size + 1;
  }

  public deleteItem(category: string, index: any): void{
    this.pantryItems.get(category)!.splice(index, 1);
  }

  public deleteSelected(){
    this.pantryItems.forEach((itemsArray: FoodItem[], category: string) => {
      itemsArray.forEach((item, index) => {
        for (let i = itemsArray.length - 1; i >= 0; i--) {
          if (itemsArray[i].selected) {
            this.deleteItem(category, i);
          }
        }
      });
    })
  }

  switchToolbar() {
    this.toolbar == 'pantry' ? this.toolbar = 'select' : this.toolbar = 'pantry';
  }
}
