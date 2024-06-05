import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PantryService } from 'src/app/services/pantry.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showPantryData: boolean = false;

  constructor(
    private r:Router, 
    private mc:ModalController,
    public ps:PantryService
  ) { }

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

  public getPantryList() { 
    return this.ps.getPantryList; 
  }
}
