import { CommonModule, isPlatformBrowser, NgFor } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { Gallery, GalleryComponent, GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';


@Component({
  selector: 'app-gallery-list',
  imports: [MatTabsModule, FormsModule, CommonModule, NgFor, GalleryModule, LightboxModule],
  templateUrl: './gallery-list.component.html',
  styleUrl: './gallery-list.component.scss'
})
export class GalleryListComponent   implements OnInit, OnDestroy  {

  items: GalleryItem[] = []
  @Input() imagePaths: string[] = [];
  @Input() galleryId = '';
  isBrowser = false;
  intervalId: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, public gallery: Gallery, private lightbox: Lightbox) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }


  ngOnDestroy(): void {
  }
  
  ngOnInit(): void {
    if (!this.isBrowser) return;
    // this.imagePaths = [
    //   'assets/images/gallery/gallery1.jpg',
    //   'assets/images/gallery/gallery2.jpg',
    //   'assets/images/gallery/gallery3.jpg',
    //   'assets/images/gallery/gallery4.jpg',
    //   'assets/images/gallery/gallery5.jpg',
    //   'assets/images/gallery/gallery6.jpg',
    //   'assets/images/gallery/gallery7.jpg',
    //   'assets/images/gallery/gallery8.jpg',
    //   'assets/images/gallery/gallery9.jpg',
    //   'assets/images/gallery/gallery10.jpg',
    //   'assets/images/gallery/gallery11.jpg',
    //   'assets/images/gallery/gallery12.jpg',
    // ];

    const ref = this.gallery.ref(this.galleryId);
    this.items = this.imagePaths.map(
      img => new ImageItem({ src: img, thumb: img, alt: "test" })
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
      loadingStrategy: 'preload'
    })
  }
    @HostListener('window:resize')
  onResize() {

    // Use these values if you want to dynamically limit size in component logic
  }
}
