import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FoodItem } from 'src/app/data/food-item';
import { ShoppingService } from 'src/app/services/shopping.service';
import { GestureController, GestureDetail, ModalController } from '@ionic/angular';
import { AddItemComponent } from 'src/app/components/modals/add-item/add-item.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit, AfterViewInit {
  public shoppingList!: FoodItem[];
  public selectedItems: boolean[] = [];

  private modalOpened: boolean = false;

  // Variables for Dragging
  @ViewChild('shoppingListRef', { read: ElementRef}) shoppingListRef!: ElementRef;
  public blurBackground: boolean = false;

  constructor(
    private shoppingService: ShoppingService, 
    private mc: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private gestureCtrl: GestureController
  ) { }

  ngOnInit() {
    console.log('init')
    // If navigated from home page, opens Add Item Modal

    this.route.queryParams.subscribe(async params => {
      this.shoppingList = this.shoppingService.getShoppingList();
      this.selectedItems = [];
      for (let _ of this.shoppingService.getShoppingList()) {
        this.selectedItems.push(false);
      }

      if (params['addItem'] === 'true') {
        this.modalOpened = true;
        await this.addShoppingItem();
        this.clearQueryParams();
      }
    });
  }

  ngAfterViewInit(): void {
    // MATT TESTING FOR GESTURES
    console.log(this.shoppingListRef);
    const gesture = this.gestureCtrl.create({
      el: this.shoppingListRef.nativeElement.closest('ion-content'),
      onStart: () => this.onStart(),
      onMove: (detail) => this.onMove(detail),
      onEnd: () => this.onEnd(),
      gestureName: 'dragging',
      blurOnStart: true,
    })

    gesture.enable();
  }

  private onStart() {
    console.log('STARTING');
    if (this.selectedItems.filter(item => item).length > 0) { this.blurBackground = true; }
    this.cdRef.detectChanges();
  }

  private onMove(detail: GestureDetail) {
    console.log('MOVING');
  }

  private onEnd() {
    console.log('ENDING');
    this.blurBackground = false;
    this.cdRef.detectChanges();
  }

  clearQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { addItem: null },
      queryParamsHandling: 'merge'
    });
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
      this.shoppingService.addItemToList(data);
      
    }
  }

  public selectAll() {
    console.log(this.selectedItems);
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.selectedItems[i] = true;
    }
  }

  public removeSelected() {
    this.shoppingList.forEach((item, i) => {if (this.selectedItems[i]) { this.shoppingService.removeItem(item)}})

    this.shoppingList = this.shoppingList.filter((_, i) => !this.selectedItems[i]);
    this.selectedItems = this.selectedItems.filter((_, i) => !this.selectedItems[i]);
  }

  public renewSelected() {
    this.shoppingList.forEach((item, i) => {
      if (this.selectedItems[i]) {
        this.shoppingService.renewItem(item);
        // this.shoppingList[i].renewExpiration();
      }
    });

    this.removeSelected();
  }
}
