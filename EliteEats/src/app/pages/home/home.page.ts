import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { AddPantryItemModalComponent } from 'src/app/components/add-pantry-item-modal/add-pantry-item-modal.component';
import { PantryPage } from '../pantry/pantry.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private r:Router, private mc:ModalController) { }

  ngOnInit() {
  }

  navigatePantryAdd(){
    this.r.navigate(['/tabs/pantry'], { queryParams: { addItem: 'true' }});
  }
}
