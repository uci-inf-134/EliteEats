import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.page.html',
  styleUrls: ['./pantry.page.scss'],
})
export class PantryPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  public addedItemName:String = '';

  constructor() { }

  ngOnInit() {
  }

  public addItem() {
    console.log(this.addedItemName);
    this.modal.dismiss(null, 'cancel');
  }

}
