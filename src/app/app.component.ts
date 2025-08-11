import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('J & J Moran Lawn Care');
    this.meta.updateTag({
      name: 'description',
      content:
        'J & J Moran Lawn Care provides reliable and professional lawn care services in Hampton Roads, VA — including mowing, trimming, edging, and more to keep your yard looking its best.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'lawn care Hampton Roads VA, grass cutting, yard maintenance, mowing service, edging, trimming, local lawn service, J & J Moran Lawn Care',
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      property: 'og:title',
      content: 'J & J Moran | Lawn Care in Hampton Roads, VA',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Reliable lawn care services in Hampton Roads, VA — mowing, trimming, edging, and more.',
    });
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://www.facebook.com/jcmoran9022',
    });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://www.facebook.com/jcmoran9022/photo',
    }); // Replace with actual image URL from Facebook
    //TODO: update links if using custom site images or other service pages
  }
}
