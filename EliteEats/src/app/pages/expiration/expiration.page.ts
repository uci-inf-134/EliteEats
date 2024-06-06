import { Component, OnInit } from '@angular/core';
import { ExpirationService } from 'src/app/services/expiration.service';
import { FoodItem } from 'src/app/data/food-item';

@Component({
  selector: 'app-expiration',
  templateUrl: './expiration.page.html',
  styleUrls: ['./expiration.page.scss'],
})
export class ExpirationPage implements OnInit {
  public itemsTracked: FoodItem[] = [];

  constructor(private es: ExpirationService) { }

  ngOnInit() {
    this.itemsTracked = this.es.getItemsTracked();
  }

}
