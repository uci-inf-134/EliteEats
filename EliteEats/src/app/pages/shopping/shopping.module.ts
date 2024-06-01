import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingPageRoutingModule } from './shopping-routing.module';

import { ShoppingPage } from './shopping.page';
import { ShoppingListComponent } from 'src/app/components/shopping-list/shopping-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingPageRoutingModule,
    ShoppingListComponent
  ],
  declarations: [ShoppingPage]
})
export class ShoppingPageModule {}
