import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FoodItem } from 'src/app/data/food-item';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-expiration-list',
  templateUrl: './expiration-list.component.html',
  styleUrls: ['./expiration-list.component.scss'],
})
export class ExpirationListComponent  implements OnInit {
  @Input({required: true}) expiringItems!: FoodItem[];

  constructor() { }

  ngOnInit() {}

}
