import { CommonModule, isPlatformBrowser, NgFor } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { GalleryModule,  } from 'ng-gallery';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-gallery',
  imports: [HeaderComponent, MatTabsModule, FormsModule, CommonModule, NgFor],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  selected = new FormControl(0);
  isBrowser = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }




  tabs = [
    {
      label: 'Textured Nail Art',
      src: 'assets/images/services/nailart.svg'
    },
    {
      label: 'Nail Design',
      src: 'assets/images/services/naildesign.svg'
    },
    {
      label: 'Manicure',
      src: 'assets/images/manicure1.svg'
    },
    {
      label: 'Pedicure',
      src: 'assets/images/pedicure1.svg'
    },
    {
      label: 'Acrylic',
      src: 'assets/images/gallery/gallery7.svg'
    },
  ];

  ngOnInit(): void {

  }
  
  clickRight(fromAutoplay = false): void {
    this.selected.setValue(((this.selected.value || 0) + 1) % this.tabs.length);
    // if (!fromAutoplay) {
    //   setTimeout(() => this.scrollToBottom(), 500);
    // }
  }
  clickLeft() {
    const currInd = this.selected.value ?? 0;
    if (currInd === 0) {
      this.selected.setValue(this.tabs.length - 1);
    }
    else {
      this.selected.setValue(currInd - 1)
    }
    // setTimeout(() => this.scrollToBottom(), 500);
  }
  
  goToImage(ind:number){
    this.selected.setValue(ind);
  }  selectedTab = 0;

  private touchStartX = 0;
  private touchEndX = 0;

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture();
  }

  handleSwipeGesture(): void {
    const swipeDistance = this.touchStartX - this.touchEndX;
    if(this.selected && typeof this.selected.value === 'number'){
      if (swipeDistance > 50) {
        this.clickRight();
      } else if (swipeDistance < -50 ) {
        this.clickLeft();
      }
    }
  }
}
