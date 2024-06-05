import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddItemComponent } from 'src/app/components/modals/add-item/add-item.component';
import { FoodItem } from 'src/app/data/food-item';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {
  private modalOpened: boolean = false; // used for clearing queries

  constructor(
    private shoppingService: ShoppingService, 
    private mc: ModalController,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // subscribe to home page "add to Shopping List" button
    this.route.queryParams.subscribe(async params => {
      if (params['addItem'] === 'true') {
        this.modalOpened = true;
        await this.addItem();
        this.clearQueryParams();
      }
    });
  }

  clearQueryParams() {
    // Clear the query parameters after opening the modal
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { addItem: null },
      queryParamsHandling: 'merge'
    });
  }

  // Show addItem modal
  async addItem(){
    const modal = await this.mc.create({
      component: AddItemComponent,
      componentProps: {
        modalType: 'Shopping List'
      }
    });
    modal.present();

    const{data, role} = await modal.onWillDismiss();

    if (role === 'confirm'){
      this.shoppingService.addItemToList(data);
    }
  }

  // Method to get Shopping List
  public getShoppingList(): Array<FoodItem> {
    return this.shoppingService.getShoppingList();
  }

}
