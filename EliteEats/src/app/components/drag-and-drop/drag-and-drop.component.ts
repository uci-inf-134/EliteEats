import { Component, OnInit, QueryList, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GestureController, GestureDetail, IonItem, IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule],
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent implements OnInit {
  @ViewChild(IonItem, { read: ElementRef }) ionItem!: ElementRef<HTMLIonItemElement>;
  @ViewChild('trashDrop', { read: ElementRef }) trashDrop!: ElementRef<HTMLButtonElement>;
  @ViewChild('shoppingDrop', { read: ElementRef }) shoppingDrop!: ElementRef<HTMLButtonElement>;
  @ViewChild(IonItem, { read: ElementRef }) items!: QueryList<ElementRef>;

  isItemActive: boolean = false;
  currentX: number = 0;
  currentY: number = 0;

  constructor(private el: ElementRef, private gCtrl: GestureController, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    const gesture = this.gCtrl.create({
      el: this.el.nativeElement.closest('ion-content'),
      onStart: () => this.onStart(),
      onMove: (detail) => this.onMove(detail),
      onEnd: (detail) => this.onEnd(detail),
      gestureName: 'Drag and Drop',
    });

    gesture.enable();
  }

  private onStart() {
    this.isItemActive = true;
    console.log("gesture start")
    this.cdRef.detectChanges();
  }

  private onMove(detail: GestureDetail) {
  }

  private onEnd(detail: GestureDetail) {
    this.isItemActive = false;

    if (!this.trashDrop || !this.shoppingDrop) {
      console.error('Drop zones are not defined');
      return;
    }

    // Check if the item is over the trash or shopping drop zones
    const trashDropRect = this.trashDrop.nativeElement.getBoundingClientRect();
    const shoppingDropRect = this.shoppingDrop.nativeElement.getBoundingClientRect();

    if (this.isOverDropZone(this.currentX, this.currentY, trashDropRect)) {
      this.onDropToTrash();
    } else if (this.isOverDropZone(this.currentX, this.currentY, shoppingDropRect)) {
      this.onDropToShoppingList();
    }

    this.cdRef.detectChanges();
  }

  private isOverDropZone(x: number, y: number, dropZoneRect: DOMRect): boolean {
    return (
      x >= dropZoneRect.left &&
      x <= dropZoneRect.right &&
      y >= dropZoneRect.top &&
      y <= dropZoneRect.bottom
    );
  }

  private onDropToTrash() {
    console.log('Dropped to Trash');
    // Implement the logic for dropping the item to trash
  }

  private onDropToShoppingList() {
    console.log('Dropped to Shopping List');
    // Implement the logic for dropping the item to shopping list
  }
}
