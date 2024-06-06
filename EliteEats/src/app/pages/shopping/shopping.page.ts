import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/data/food-item';
import { ShoppingService } from 'src/app/services/shopping.service';
import { ModalController } from '@ionic/angular';
import { AddItemComponent } from 'src/app/components/modals/add-item/add-item.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {
  private modalOpened: boolean = false;

  constructor(
    private shoppingService: ShoppingService, 
    private mc: ModalController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // If navigated from home page, opens Add Item Modal
    this.route.queryParams.subscribe(async params => {
      if (params['addItem'] === 'true') {
        this.modalOpened = true;
        await this.addShoppingItem();
        this.clearQueryParams();
      }
    });
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
      
    }
  }

}
