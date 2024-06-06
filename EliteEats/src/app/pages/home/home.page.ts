import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ExpirationService } from 'src/app/services/expiration.service';
import { FoodItem } from 'src/app/data/food-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private r:Router, private mc:ModalController, private es:ExpirationService) { }

  ngOnInit() {
  }

  navigateToPantry(){
    this.r.navigate(['/tabs/pantry']);
  }

  navigateToPantryAdd(){
    this.r.navigate(['/tabs/pantry'], { queryParams: { addItem: 'true' }});
  }

  navigateToShoppingAdd(){
    this.r.navigate(['/tabs/shopping'], { queryParams: { addItem: 'true' }});
  }

  getExpiringItems(): FoodItem[] {
    return this.es.getItemsTracked().filter(item => item.daysUntilExpire < 7);
  }
}
