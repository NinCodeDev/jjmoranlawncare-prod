import { AfterViewInit, Component } from '@angular/core';
import { GalleryListComponent } from '../../shared/gallery-list/gallery-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artists',
  imports: [GalleryListComponent],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss',
})
export class ArtistsComponent implements AfterViewInit {
  constructor(private route: ActivatedRoute) {}
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
  }
  chandlerGallery: string[] = [
    'assets/images/gallery/gallery1.jpg',
    'assets/images/gallery/gallery2.jpg',
    'assets/images/gallery/gallery3.jpg',
    'assets/images/gallery/gallery4.jpg',
    'assets/images/gallery/gallery5.jpg',
    'assets/images/gallery/gallery6.jpg',
    'assets/images/gallery/gallery7.jpg',
    'assets/images/gallery/gallery8.jpg',
    'assets/images/gallery/gallery9.jpg',
    'assets/images/gallery/gallery10.jpg',
    'assets/images/gallery/gallery11.jpg',
    'assets/images/gallery/gallery12.jpg',
  ];

  tuff: string[] = [
    'assets/images/gallery/tuff1.jpg',
    'assets/images/gallery/tuff2.jpg',
  ];

  cars: string[] = [
    'assets/images/gallery/car1.jpg',
    'assets/images/gallery/car2.jpg',
    'assets/images/gallery/car3.jpg',
    'assets/images/gallery/car4.jpg',
  ];

  fallspring = [
    'assets/images/gallery/edge4.png',
    'assets/images/gallery/edge1.jpg',
    'assets/images/gallery/edge2.jpg',
    'assets/images/gallery/edge3.jpg',
    'assets/images/gallery/edge5.jpg',
  ];
  lawn = [
    'assets/images/gallery/gallery2.jpg',
    'assets/images/gallery/gallery1.jpg',
    'assets/images/gallery/gallery3.jpg',
    'assets/images/gallery/gallery4.jpg',
    'assets/images/gallery/gallery5.jpg',
  ];
  mulch = [
    'assets/images/gallery/mulch.svg',
    'assets/images/gallery/edge1.jpg',
    'assets/images/gallery/edge2.jpg',
    'assets/images/gallery/edge3.jpg',
    'assets/images/gallery/edge5.jpg',
  ];
}
