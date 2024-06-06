import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PantryPageRoutingModule } from './pantry-routing.module';

import { PantryPage } from './pantry.page';
import { ExpirationNotificationComponent } from 'src/app/components/modals/expiration-notification/expiration-notification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PantryPageRoutingModule,
    ExpirationNotificationComponent
  ],
  declarations: [PantryPage]
})
export class PantryPageModule {}
