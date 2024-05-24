import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpirationPageRoutingModule } from './expiration-routing.module';

import { ExpirationPage } from './expiration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpirationPageRoutingModule
  ],
  declarations: [ExpirationPage]
})
export class ExpirationPageModule {}
