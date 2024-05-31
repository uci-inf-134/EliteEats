import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

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
  private pantryItems: Map<string, FoodItem[]> = new Map();
  
  // conditionals for UI components
  public itemsSelected: number = 0;
  public totalEntries: number = 0;
  public toolbarState: string = 'pantry'; // default toolbar vs selected toolbar
  public pantryIsOccupied: boolean = false;
  
  public readonly categories: string[] = FoodItem.categories; // used for UI dividers
  private modalOpened: boolean = false;

  constructor(private route: ActivatedRoute, private router:Router, private mc:ModalController) {}

  ngOnInit() {
    // If navigated from home page, opens Add Item Modal
    this.route.queryParams.subscribe(async params => {
      if (params['addItem'] === 'true') {
        this.modalOpened = true;
        await this.addPantryItem();
        this.clearQueryParams();
      }
    });

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
    /** end of static data. DELETE LATER DELETE LATER */

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
    this.totalEntries++;

    // if adding first item, change occupiedStatus to true
    if (this.totalEntries == 1){ this.pantryIsOccupied = true; }
  }

  clearQueryParams() {
    // Clear the query parameters after opening the modal
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { addItem: null },
      queryParamsHandling: 'merge'
    });
  }

  public pantryHasCategory(category: string): boolean {
    return this.pantryItems.has(category) && this.pantryItems.get(category)!.length > 0;
  }

  public getItemsByCategory(category: string): FoodItem[] {
    return this.pantryItems.get(category) || [];
  }

  public updateSelection(item: FoodItem){
    // checked <--> unchecked
    item.selected != item.selected;

    // if item is selected, add to counter, else deduct
    item.selected ? this.itemsSelected++ : this.itemsSelected--;

    // once the first item is selected, the toolbar will be set to select until the user presses back
    if (this.itemsSelected = 1){ this.setToolbar('select'); }
  }

  public selectAll(state: boolean): void {
    this.pantryItems.forEach((itemsArray: FoodItem[]) => {
      FoodItem.selectedAll(itemsArray, state);
    })

    // update count of selected entries
    state ? this.itemsSelected = this.totalEntries : this.itemsSelected = 0;
  }

  public deleteItem(category: string, index: any): void{
    this.pantryItems.get(category)!.splice(index, 1);
    this.totalEntries--;

    // if deleting item removed last element, change occupiedStatus to false
    if (this.totalEntries == 0){ 
      this.pantryIsOccupied = false; 

      // since there is nothing to select, exit select toolbar
      this.setToolbar('pantry');
    }
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

  public setToolbar(state: 'pantry' | 'select'){
    this.toolbarState = state;
  }
}
