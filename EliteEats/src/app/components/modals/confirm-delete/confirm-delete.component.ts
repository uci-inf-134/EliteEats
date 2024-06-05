import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodItem } from 'src/app/data/food-item';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent  implements OnInit {
  @Input({required: true}) itemsSelected!: FoodItem[];

  constructor(private mc: ModalController) { }

  ngOnInit() {}

  close(){
    return this.mc.dismiss(null, 'cancel');
  }

  confirm(){
    return this.mc.dismiss(null, 'confirm');
  }

}
