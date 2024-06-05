import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPantryItemModalComponent } from './components/add-pantry-item-modal/add-pantry-item-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { PantryListComponent } from './components/pantry-list/pantry-list.component';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPantryItemModalComponent,
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
