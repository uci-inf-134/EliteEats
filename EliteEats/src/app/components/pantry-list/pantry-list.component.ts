import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/data/food-item';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PantryService } from 'src/app/services/pantry.service';

@Component({
  standalone: true,
  selector: 'app-pantry-list',
  templateUrl: './pantry-list.component.html',
  styleUrls: ['./pantry-list.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class PantryListComponent  implements OnInit {
  public pantryItems!: Map<string, FoodItem[]>;
  public readonly categories: string[] = FoodItem.categories;

  constructor(private ps: PantryService) {}

  ngOnInit() {
    this.pantryItems = this.ps.getPantryList()
  }

  public getItemsByCategory(category: string): FoodItem[] {
    return this.pantryItems.get(category) || [];
  }

  public getPantryList(){
    return this.ps.getPantryList();
  }

}
