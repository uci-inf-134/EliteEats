import { Component, OnInit, ViewChild, ElementRef, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestureController, IonItem, ModalController } from '@ionic/angular';

import { FoodItem } from 'src/app/data/food-item';
import { PantryService } from 'src/app/services/pantry.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { AddItemComponent } from 'src/app/components/modals/add-item/add-item.component';
import { ConfirmDeleteComponent } from 'src/app/components/modals/confirm-delete/confirm-delete.component';


@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.page.html',
  styleUrls: ['./pantry.page.scss'],
  template: '{{PantryService.pantryItems}}'
})
export class PantryPage implements OnInit {

  public pantryItems: Map<string, FoodItem[]> = new Map();
  
  // conditionals for UI components
  public itemsSelected: FoodItem[] = [];
  public totalEntries: number = 0;
  public selectState: string = 'selectAll';
  public pantryIsOccupied: boolean = false;
  
  public readonly categories: string[] = FoodItem.categories; // used for UI dividers
  private modalOpened: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router:Router, 
    private mc:ModalController, 
    private shoppingService: ShoppingService, 
    private ps: PantryService,
  ) {}

  ngOnInit() {
    // If navigated from home page, opens Add Item Modal
    this.route.queryParams.subscribe(async params => {
      if (params['addItem'] === 'true') {
        this.modalOpened = true;
        await this.addItem();
        this.clearQueryParams();
      }
    });

    this.pantryItems = this.ps.getPantryList();
    this.totalEntries = this.pantryItems.size;
    this.pantryIsOccupied = this.pantryItems.size > 0;

    /** STATIC DATA FOR TESTING */
    const itemData = [
      { name: 'Apple', category: 'Fruits', expirationDate: new Date('2024-06-4') },
      { name: 'Banana', category: 'Fruits', expirationDate: new Date('2024-06-30') },
      { name: 'Spinach', category: 'Vegetables', expirationDate: new Date('2024-06-3') },
      { name: 'Milk', category: 'Dairy', expirationDate: new Date('2024-06-1') },
      { name: 'Beef', category: 'Meats', expirationDate: new Date('2024-07-02') },
      { name: 'Salmon', category: 'Seafood', expirationDate: new Date('2024-07-05') },
      { name: 'Rice', category: 'Grains and Cereals', expirationDate: new Date('2024-07-15') },
      { name: 'Bread', category: 'Bread and Bakery', expirationDate: new Date('2024-07-12') },
      { name: 'Pasta', category: 'Pantry Goods', expirationDate: new Date('2024-07-15') },
      { name: 'Ice Cream', category: 'Frozen Foods', expirationDate: new Date('2024-06-07') },
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

  async addItem(){
    const modal = await this.mc.create({
      component: AddItemComponent,
      componentProps: {
        modalType: 'Pantry'
      }
    });
    modal.present();

    const{data, role} = await modal.onWillDismiss();

    if (role === 'confirm'){
      // add foodItem from modal to organized pantryItems map
      this.addToCategory(data);
    }
  }

  private addToCategory(item: FoodItem){
   this.ps.addPantryItem(item.category, item);
   this.updatePantryState();
  }

  private updatePantryState() {
    this.pantryItems = this.ps.getPantryList();
    this.totalEntries = Array.from(this.pantryItems.values()).reduce((sum, items) => sum + items.length, 0);
    this.pantryIsOccupied = this.totalEntries > 0;
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

    // add or removes item from itemsSelected array based on checked state
    public updateSelection(item: FoodItem){
      item.selected ? this.itemsSelected.push(item) : this.itemsSelected.splice(this.itemsSelected.indexOf(item), 1);
    }
  
    // UI component: used to understand if "selectAll" or "deselectAll" button should be shown
    public setSelectState(state: 'selectAll' | 'deselectAll'){
      this.selectState = state;
    }
  
    // select all items, update checked state, add to selectedItems array, and change toolbar select state if needed
    public selectAll(state: boolean): void {
      this.pantryItems.forEach((itemsArray: FoodItem[]) => {
        FoodItem.selectedAll(itemsArray, state);
        itemsArray.forEach(item => this.updateSelection(item));
      })
  
      // update count of selected entries
      this.itemsSelected.length == this.totalEntries ? this.setSelectState('deselectAll') : this.setSelectState('selectAll');
    }
  
    // single delete
    public deleteItem(category: string, index: any): void{
      const item: FoodItem = this.pantryItems.get(category)![index];

      // remove item from pantry list and selected list
      this.pantryItems.get(category)!.splice(index, 1);
      this.itemsSelected.splice(this.itemsSelected.indexOf(item), 1);
      this.ps.removePantryItem(category, item);
      this.totalEntries--;
  
      // if deleting item removed last element, change occupiedStatus to false
      if (this.totalEntries == 0){ 
        this.pantryIsOccupied = false; 
        this.setSelectState('selectAll');
      }
    }
  
    // batch delete
    async deleteSelected(){
      // show warning module if > 1 item selected
      if (this.itemsSelected.length == 1){
        this.batchDelete();
      }
      else if (this.itemsSelected.length > 1){
        const modal = await this.mc.create({
          component: ConfirmDeleteComponent,
          componentProps: {
            itemsSelected: this.itemsSelected
          }
        });
        modal.present();
    
        const{data, role} = await modal.onWillDismiss();
    
        if (role === 'confirm'){
          this.batchDelete();
        }
      }
      else {
        throw new Error("Error: Negative Selection");
      }
    }

    private batchDelete(): void{
      this.pantryItems.forEach((itemsArray: FoodItem[], category: string) => {
        itemsArray.forEach((item) => {
          for (let i = itemsArray.length - 1; i >= 0; i--) {
            if (itemsArray[i].selected) {
              this.deleteItem(category, i);
            }
          }
        });
      })
    }
  
    // single add
    public addToShoppingList(item: FoodItem, category: string ) {
      if (!this.shoppingService.itemIsInList(item)) { 
        this.shoppingService.addItem(item, category);
      }
    }
  
    // batch add
    public addSelectedtoShopping() {
      this.pantryItems.forEach((itemsArray: FoodItem[], category: string) => {
        itemsArray.forEach((item) => {
          if (item.selected) {
            this.addToShoppingList(item, category);
          }
        });
      })
    }
}
