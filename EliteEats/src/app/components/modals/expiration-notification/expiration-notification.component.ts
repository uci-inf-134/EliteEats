import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FoodItem } from 'src/app/data/food-item';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-expiration-notification',
  templateUrl: './expiration-notification.component.html',
  styleUrls: ['./expiration-notification.component.scss'],
})
export class ExpirationNotificationComponent  implements OnInit {
  @Input({required: true}) expiringItems!: FoodItem[];

  constructor(private mc: ModalController) { }

  ngOnInit() {}

  close() {
    return this.mc.dismiss(false, 'cancel');
  }

  confirm() {
    return this.mc.dismiss(true, 'confirm');
  }
}
