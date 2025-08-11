import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-services',
  imports: [HeaderComponent, MatTabsModule,FormsModule,CommonModule  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const targets = document.querySelectorAll('.slide-up-middle, .slide-in-bottom-left');
  
        targets.forEach(el => {
          const rect = el.getBoundingClientRect();
          const isInViewport = (
            rect.top < window.innerHeight && rect.bottom > 0
          );
  
          if (isInViewport) {
            el.classList.add('visible');
          } else {
            const observer = new IntersectionObserver((entries, obs) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                  obs.unobserve(entry.target);
                }
              });
            }, { threshold: 0.01 });
  
            observer.observe(el);
          }
        });
      }, 100);
      // this.intervalId = setInterval(() => {
      //   this.clickRight(true);
      // }, 5000); // auto-advance every 5 seconds
    }
  }
  selected = new FormControl(0);
  clickRight(fromAutoplay = false): void {
    this.selected.setValue(((this.selected.value || 0) + 1) % 3);
    // if (!fromAutoplay) {
    //   setTimeout(() => this.scrollToBottom(), 500);
    // }
  }
  clickLeft(){
    const currInd = this.selected.value ?? 0;
    if(currInd === 0){
      this.selected.setValue(2);
    }
    else{
      this.selected.setValue(currInd - 1)
    }
    // setTimeout(() => this.scrollToBottom(), 500);
  }
}
