import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private r:Router, private mc:ModalController) { }

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
}
