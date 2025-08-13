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

  fallspring = [
    'assets/images/gallery/cleanup2.jpg',
    'assets/images/gallery/cleanup3.jpg',
    'assets/images/gallery/cleanup1.jpg',
  ];
  lawn = [
    'assets/images/gallery/lawn3.jpg',
    'assets/images/gallery/lawn1.jpg',
    'assets/images/gallery/lawn2.jpg',
    'assets/images/gallery/lawn4.jpg',
  ];
  mulch = [
    'assets/images/gallery/mulch3.jpg',
    'assets/images/gallery/mulch2.jpg',
    'assets/images/gallery/edge3.jpg',
  ];
}
