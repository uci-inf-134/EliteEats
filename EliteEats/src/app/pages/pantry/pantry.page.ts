import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GestureController, GestureDetail, ModalController } from '@ionic/angular';

import { FoodItem } from 'src/app/data/food-item';
import { PantryService } from 'src/app/services/pantry.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { AddItemComponent } from 'src/app/components/modals/add-item/add-item.component';
import { ExpirationService } from 'src/app/services/expiration.service';
import { ExpirationNotificationComponent } from 'src/app/components/modals/expiration-notification/expiration-notification.component';


@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.page.html',
  styleUrls: ['./pantry.page.scss'],
  template: '{{PantryService.pantryItems}}'
})
export class PantryPage implements OnInit, AfterViewInit {
  public pantryItems: Map<string, FoodItem[]> = new Map();
  public itemsSelected: FoodItem[] = [];
  public expiringItems: FoodItem[] = [];
  public categorySelectionStatus: {[key: string]: boolean} = {};
  
  // conditionals for UI components
  public totalEntries: number = 0;
  public toolbarState: string = 'pantry'; // default toolbar vs selected toolbar
  public selectState: string = 'selectAll';
  public pantryIsOccupied: boolean = false;
  
  public readonly categories: string[] = FoodItem.categories; // used for UI dividers
  private modalOpened: boolean = false;

  @ViewChild('pantryList', { read: ElementRef }) pantryList!: ElementRef;
  // @ViewChild('coverblur', { read: ElementRef }) coverBlur!: ElementRef;
  public blurBackground: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router:Router, 
    private mc:ModalController, 
    private shoppingService: ShoppingService, 
    private ps: PantryService,
    private es: ExpirationService,
    private gestureCtrl: GestureController,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // If navigated from home page, opens Add Item Modal
    this.route.queryParams.subscribe(async params => {
      if (params['addItem'] === 'true') {
        this.modalOpened = true;
        await this.addPantryItem();
        this.clearQueryParams();
      }
    });

    // set defaults
    this.pantryItems = this.ps.getPantryList();
    this.totalEntries = this.pantryItems.size;
    this.pantryIsOccupied = this.pantryItems.size > 0;

    /** STATIC DATA FOR TESTING */
    const itemData = [
      { name: 'Apple', category: 'Fruits', expirationDate: new Date('2024-06-4') },
      { name: 'Banana', category: 'Fruits', expirationDate: new Date('2024-06-30') },
      { name: 'Spinach', category: 'Vegetables', expirationDate: new Date('2024-06-3') },
      { name: 'Milk', category: 'Dairy', expirationDate: new Date('2024-06-1') },
      { name: 'Beef', category: 'Meats', expirationDate: new Date('2024-06-20') },
      { name: 'Salmon', category: 'Seafood', expirationDate: new Date('2024-07-05') },
      { name: 'Rice', category: 'Grains and Cereals', expirationDate: new Date('2024-07-15') },
      { name: 'Bread', category: 'Bread and Bakery', expirationDate: new Date('2024-06-12') },
      { name: 'Pasta', category: 'Pantry Goods', expirationDate: new Date('2024-07-15') },
      { name: 'Ice Cream', category: 'Frozen Foods', expirationDate: new Date('2024-06-07') },
      { name: 'Orange Juice', category: 'Beverages', expirationDate: new Date('2024-06-16') },
      { name: 'Chips', category: 'Snacks', expirationDate: new Date('2024-07-28') },
      { name: 'Ketchup', category: 'Condiments', expirationDate: new Date('2024-08-01') },
      { name: 'Salt', category: 'Seasonings', expirationDate: new Date('2024-08-05') },
      { name: 'Olive Oil', category: 'Oils and Vinegars', expirationDate: new Date('2024-08-10') },
    ];

    // itemData.forEach(data => {
    //   const fi = new FoodItem(data.name, data.category, data.expirationDate);
    //   this.addToCategory(fi);
    // });
    /** end of static data. DELETE LATER DELETE LATER */

    Object.keys(this.pantryItems).forEach(category => {
      this.categorySelectionStatus[category] = false;
    });
  }

  ngAfterViewInit() {
    this.checkForExpiringItems();
    // MATT TESTING FOR GESTURES
    const gesture = this.gestureCtrl.create({
      el: this.pantryList.nativeElement,
      onStart: () => this.onStart(),
      onMove: (detail) => this.onMove(detail),
      onEnd: () => this.onEnd(),
      gestureName: 'testing',
      blurOnStart: true,
    })

    gesture.enable();
  }

  // GESTURE TESTING
  private onStart() {
    console.log('STARTED');
    // this.coverBlur.nativeElement.visible = true;
    if (this.itemsSelected.length > 0) { this.blurBackground = true; }
    this.cdRef.detectChanges();
  }

  private onMove(detail: GestureDetail) {
    console.log('MOVING');
  }

  private onEnd() {
    console.log('ENDED')
    // this.coverBlur.nativeElement.visible = false;
    this.blurBackground = false;
    this.cdRef.detectChanges();
  }

  // Clear the query parameters after opening the modal
  // Ensures that, after navigating from another tab, will not ALWAYS open a modal
  clearQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { addItem: null },
      queryParamsHandling: 'merge'
    });
  }

  // show modal
  async addPantryItem(){
    const modal = await this.mc.create({
      component: AddItemComponent,
      componentProps: {
        type: "Pantry"
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

  checkForExpiringItems() {
    this.expiringItems = [];
    this.pantryItems.forEach((items) => {
      items.forEach(item => {
        if (item.daysUntilExpire <= 0) {
          this.expiringItems.push(item);
        }
      });
    });

    if (this.expiringItems.length > 0) {
      this.showExpiringItemsModal();
    }
  }

  async showExpiringItemsModal() {
    const modal = await this.mc.create({
      component: ExpirationNotificationComponent,
      componentProps: {
        expiringItems: this.getExpiringItems()
      }
    });
    modal.present();

    const{data, role} = await modal.onWillDismiss();

    if (role === 'confirm'){
      this.expiringItems.forEach(item => this.deleteItem(item));
    }
  }

  private updatePantryState() {
    this.pantryItems = this.ps.getPantryList();
    this.totalEntries = Array.from(this.pantryItems.values()).reduce((sum, items) => sum + items.length, 0);
    this.pantryIsOccupied = this.totalEntries > 0;
  }

  public pantryHasCategory(category: string): boolean {
    return this.pantryItems.has(category) && this.pantryItems.get(category)!.length > 0;
  }

  public getItemsByCategory(category: string): FoodItem[] {
    return this.pantryItems.get(category) || [];
  }

  public categoryIsSelected(category: string): boolean {
    return this.categorySelectionStatus[category] || false;
  }

  // add or removes item from itemsSelected array based on checked state
  public updateSelection(item: FoodItem){
    item.selected ? this.itemsSelected.push(item) : this.itemsSelected.splice(this.itemsSelected.indexOf(item), 1);
  }

  // UI component: used to understand if "selectAll" or "deselectAll" button should be shown
  public setSelectState(state: 'selectAll' | 'deselectAll'){
    this.selectState = state;
  }

  public selectCategory(state: boolean, category: string): void {
    this.pantryItems.forEach((itemsArray: FoodItem[], section: string) => {
      if (section == category){
        FoodItem.selectedAll(itemsArray, state);
        itemsArray.forEach(item => this.updateSelection(item));
        this.categorySelectionStatus[category] = state;
      }
  })

  // update count of selected entries
  this.itemsSelected.length == this.totalEntries ? this.setSelectState('deselectAll') : this.setSelectState('selectAll');
  }

  // select all items, update checked state, add to selectedItems array, and change toolbar select state if needed
  public selectAll(state: boolean): void {
    this.pantryItems.forEach((itemsArray: FoodItem[], section: string) => {
        this.selectCategory(state, section);
    })

    // update count of selected entries
    this.itemsSelected.length == this.totalEntries ? this.setSelectState('deselectAll') : this.setSelectState('selectAll');
  }

  // single delete
  public deleteItem(item: FoodItem): void{
    const categoryArr = this.pantryItems.get(item.category);
    categoryArr!.splice(categoryArr!.indexOf(item), 1)
    this.totalEntries--;
    this.removeExpirtionTracking(item);

    // if deleting item removed last element, change occupiedStatus to false
    if (this.totalEntries == 0){ 
      this.pantryIsOccupied = false; 
    }
  }

  // batch delete
  public deleteSelected(){
    this.pantryItems.forEach((itemsArray: FoodItem[], category: string) => {
      itemsArray.forEach((item) => {
          if (item.selected) {
            this.deleteItem(item);
          }
      });
    })
  }

  // single add
  public addToShoppingList(item: FoodItem) {
    if (!this.shoppingService.itemIsInList(item)) { 
      console.log("TESTT")
      this.shoppingService.addItemToList(item);
    }
  }

  // batch add
  public addSelectedtoShopping() {
    this.pantryItems.forEach((itemsArray: FoodItem[]) => {
      itemsArray.forEach((item) => {
        if (item.selected) {
          console.log('HELP ME');
          this.addToShoppingList(item);
        }
      });
    })
  }

  public addExpirationTracking(items: FoodItem | FoodItem[]): void {
    // if its an array of FoodItems, iterate and add
    if (Array.isArray(items)){
      items.forEach(item => {
        if (!this.es.isItemTracked(item)) {
          this.es.trackItem(item)
        }
      });
    }
    else if (!this.es.isItemTracked(items)){
      this.es.trackItem(items);
    }
  }

  public removeExpirtionTracking(items: FoodItem | FoodItem[]): void {
    if (Array.isArray(items)){
      items.forEach(item => {
        this.es.removeItemTracking(item);
      })
    }
    else {
      this.es.removeItemTracking(items);
    }
  }

  public getExpiringItems(): FoodItem[] {
    return this.expiringItems;
  }
}
