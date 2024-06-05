import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddItemComponent } from './components/modals/add-item/add-item.component';
import { ConfirmDeleteComponent } from './components/modals/confirm-delete/confirm-delete.component';
import { ConfirmAddComponent } from './components/modals/confirm-add/confirm-add.component';

@NgModule({
  declarations: [
    AppComponent,
    AddItemComponent,
    ConfirmDeleteComponent,
    ConfirmAddComponent
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
