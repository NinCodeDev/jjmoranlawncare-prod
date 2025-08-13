import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl, FormsModule } from '@angular/forms';

import { CommonModule, isPlatformBrowser, NgFor } from '@angular/common';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { GalleryModule } from 'ng-gallery';
import { GalleryComponent } from '../../shared/gallery/gallery.component';
import { CardComponent } from '../../shared/card/card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CardComponent,
    MatTabsModule,
    FormsModule,
    CommonModule,
    NgFor,
    GalleryModule,
    LightboxModule,
    GalleryComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent
  implements OnInit, AfterViewInit, OnDestroy, AfterViewInit
{
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  tabAnimated = false;
  selected = new FormControl(0);
  isBrowser = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public gallery: Gallery,
    private lightbox: Lightbox,
    private route: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  intervalId: any;
  @ViewChild('tabGroup') tabGroupRef!: ElementRef;
  items: GalleryItem[] = [];
  serviceItems: GalleryItem[] = [];
  imagePaths: string[] = [];
  selectedImage: string | null = null;
  galleryId = 'serviceGallery';
  tabs = [
    {
      label: 'Textured Nail Art',
      src: 'assets/images/services/nailart.svg',
    },
    {
      label: 'Nail Design',
      src: 'assets/images/services/naildesign.svg',
    },
    {
      label: 'Manicure',
      src: 'assets/images/manicure1.svg',
    },
    {
      label: 'Pedicure',
      src: 'assets/images/pedicure1.svg',
    },
    {
      label: 'Acrylic',
      src: 'assets/images/gallery/gallery7.svg',
    },
  ];

  fallspring = {
    Cleanup: 'assets/images/gallery/cleanup2.jpg',
    image2: 'assets/images/gallery/cleanup3.jpg',
    image3: 'assets/images/gallery/cleanup1.jpg',
  };
  lawn = {
    Lawn: 'assets/images/gallery/lawn3.jpg',
    image2: 'assets/images/gallery/lawn1.jpg',
    image3: 'assets/images/gallery/lawn2.jpg',
    image4: 'assets/images/gallery/lawn4.jpg',
  };
  mulch = {
    Mulching: 'assets/images/gallery/mulch2.jpg',
    image2: 'assets/images/gallery/mulch3.jpg',
    image4: 'assets/images/gallery/edge3.jpg',
  };

  edge = {
    Trimming: 'assets/images/gallery/trimming1.jpg',
    image2: 'assets/images/gallery/edge1.jpg',
    image3: 'assets/images/gallery/edge2.jpg',
    image5: 'assets/images/gallery/edge5.jpg',
  };
  links = [
    'https://open.spotify.com/artist/7hKEIXWtAS2LHVE8FK4kQx?si=ESFPpWP2SaabzxuHhvLohQ&nd=1&dlsi=24bcf01e3365485a',
    'https://open.spotify.com/artist/35Z9ISGpsxeonwsS63zNVN?si=gx5igWDLRKSCk8KU3HAVTQ&utm_medium=share&utm_source=linktree&nd=1&dlsi=ccd71b2acdc941f1',
  ];
  images2 = {
    CORVETTE: 'assets/images/gallery/car2.jpg',
    MUSTANG: 'assets/images/gallery/car1.jpg',
    WORKSHOP: 'assets/images/gallery/car3.jpg',
    AUDI: 'assets/images/gallery/car4.jpg',
  };
  services = this.tabs.length;

  openImage(image: string): void {
    this.selectedImage = image;
  }
  openInFullScreen(index: number) {
    this.lightbox.open(index, 'stuff', {
      panelClass: 'fullscreen',
    });
  }
  closeImage(): void {
    this.selectedImage = null;
  }
  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.imagePaths = [
      'assets/images/gallery/gallery1.svg',
      'assets/images/gallery/gallery2.svg',
      'assets/images/gallery/gallery3.svg',
      'assets/images/gallery/gallery4.svg',
      'assets/images/gallery/gallery5.svg',
      'assets/images/gallery/gallery6.svg',
      'assets/images/gallery/gallery7.svg',
      'assets/images/gallery/gallery8.svg',
      'assets/images/gallery/gallery9.svg',
      'assets/images/gallery/gallery10.svg',
      'assets/images/gallery/gallery11.svg',
      'assets/images/gallery/gallery12.svg',
      // Add more paths as needed
    ];

    const ref = this.gallery.ref(this.galleryId);
    this.items = this.imagePaths.map(
      (img) => new ImageItem({ src: img, thumb: img, alt: 'test' })
    );
    this.serviceItems = this.tabs.map(
      (tab) => new ImageItem({ src: tab.src, thumb: tab.src, alt: tab.label })
    );
    this.gallery.ref().load(this.items);
    ref.load(this.items);
    ref.setConfig({
      imageSize: 'contain',
      nav: true,
      bullets: true,
      thumbs: true,
      counter: true,
      itemAutosize: true,
      thumbImageSize: 'contain',
      thumbHeight: 100,
      thumbWidth: 100,

      loop: true,
      loadingStrategy: 'preload',
    });
  }
  ngOnDestroy(): void {
    // Stop the interval if user navigates away
    clearInterval(this.intervalId);
  }
  @HostListener('window:resize')
  onResize() {
    // Use these values if you want to dynamically limit size in component logic
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const el = document.getElementById(fragment);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 0); // delay ensures DOM is fully rendered
        }
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const targets = document.querySelectorAll(
          '.slide-up-middle, .slide-in-bottom-left'
        );

        targets.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

          if (isInViewport) {
            el.classList.add('visible');
          } else {
            const observer = new IntersectionObserver(
              (entries, obs) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                  }
                });
              },
              { threshold: 0.01 }
            );

            observer.observe(el);
          }
        });
      }, 100);
      // this.intervalId = setInterval(() => {
      //   this.clickRight(true);
      // }, 5000); // auto-advance every 5 seconds
    }
  }
  scrollToBottom(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
}
