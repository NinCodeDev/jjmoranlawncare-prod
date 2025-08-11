import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit, OnChanges {
  @Input() bottomBorder = false;
  @Input() scrollText = '';
  @Input() routeTo = '';
  @Input() sectionName = '';
  @Input() images: { [key: string]: string } = {};
  @Input() type = '';
  @Input() routingButtonTxt = '';
  artistNames: string[] = [];
  currentIndex = 0;
  currentArtist = '';
  @Input() sideBarColor = 'green-bg';
  @Input() cardColor = 'red-bg';
  @Input() topBtnTxt = '';
  @Input() botBtnTxt = '';
  @Input() links: string[] = [];

  image = '';
  constructor(private router: Router) {}
  ngOnInit() {
    this.initializeGallery();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['images'] && Object.keys(this.images).length) {
      this.initializeGallery();
    }
  }
  onClickCard() {
    this.router
      .navigate([`/${this.routeTo}`], {
        fragment: `${Object.keys(this.images)[0]}`,
      })
      .then(() => {
        // Wait for DOM to settle, then scroll manually
        setTimeout(() => {
          const el = document.getElementById(this.currentArtist);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100); // adjust if needed
      });
  }
  slideDirection: 'slide-left' | 'slide-right' | '' = '';

  nextArtist() {
    if (!this.artistNames.length) return;

    this.slideDirection = 'slide-left';
    this.triggerSlide(() => {
      this.currentIndex = (this.currentIndex + 1) % this.artistNames.length;
      this.updateCurrentArtist();
    });
  }

  openInNewTab(): void {
    window.open(this.links[this.currentIndex], '_blank');
  }
  prevArtist() {
    if (!this.artistNames.length) return;

    this.slideDirection = 'slide-right';
    this.triggerSlide(() => {
      this.currentIndex =
        (this.currentIndex - 1 + this.artistNames.length) %
        this.artistNames.length;
      this.updateCurrentArtist();
    });
  }

  updateCurrentArtist() {
    this.currentArtist = this.artistNames[this.currentIndex];
    this.image = this.images[this.currentArtist];
    // this.type = this.currentArtist; prevent from updating name
  }

  triggerSlide(callback: () => void) {
    this.image = ''; // hide current image first to reset animation
    setTimeout(() => {
      callback(); // update image
      setTimeout(() => {
        this.slideDirection = ''; // clear animation class
      }, 500); // match animation duration
    }, 50); // slight delay so DOM applies empty state
  }
  initializeGallery() {
    this.artistNames = Object.keys(this.images);
    this.currentIndex = 0;
    this.currentArtist = this.artistNames[this.currentIndex];
    this.image = this.images[this.currentArtist];
    this.type = this.currentArtist;
  }
}
