import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ShoppingListComponent } from 'src/app/components/shopping-list/shopping-list.component';
import { PantryListComponent } from 'src/app/components/pantry-list/pantry-list.component';
import { ExpirationListComponent } from 'src/app/components/expiration-list/expiration-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ShoppingListComponent,
    PantryListComponent,
    ExpirationListComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
