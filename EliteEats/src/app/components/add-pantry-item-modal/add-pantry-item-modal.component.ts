import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FoodItem } from 'src/app/data/food-item';

@Component({
  selector: 'app-add-pantry-item-modal',
  templateUrl: './add-pantry-item-modal.component.html',
  styleUrls: ['./add-pantry-item-modal.component.scss'],
})
export class AddPantryItemModalComponent  implements OnInit {
  addItemForm: FormGroup;

  // From Data/FoodItem
  public categories: string[] = FoodItem.categories;
  public expirationPeriods: string[] = FoodItem.expirationPeriods;

  constructor(public fb: FormBuilder, private mc:ModalController) { 
    this.addItemForm = fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      expirationAmount: ['', Validators.required],
      expirationUnit: ['', Validators.required],
    })
  }

  ngOnInit() {}

  private calculateExpiration(expAmt: number, expUnit: string): Date {
    // begins as startDate
    let date = new Date();

    // add units of time
    switch (expUnit) {
      case 'day(s)': {
        date.setDate(date.getDate() + expAmt);
        break;
      }
      case 'week(s)': {
        date.setDate(date.getDate() + (expAmt * 7));
        break;
      }
      case 'month(s)': {
        date.setDate(date.getMonth() + expAmt);
        break;
      }
      case 'year(s)': {
        date.setDate(date.getFullYear() + expAmt);
        break;
      }
    }

    return date;
  }

  close(){
    return this.mc.dismiss(null, 'cancel');
  }

  addItem(){
    // extract form values
    const { name, category, expirationAmount, expirationUnit } = this.addItemForm.value;

    // calculate final expiration date
    const expirationDate = this.calculateExpiration(expirationAmount, expirationUnit);

    // create food item
    let foodItem = new FoodItem(name, category, expirationDate);
    
    // close modal
    return this.mc.dismiss(foodItem, 'confirm');
  }

}
