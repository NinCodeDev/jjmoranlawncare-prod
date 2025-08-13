import {
  Component,
  EventEmitter,
  Inject,
  NgZone,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../directives/click-outside.directive';

@Component({
  selector: 'app-header',
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    ClickOutsideDirective,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() goToAbout = new EventEmitter<void>();
  closeTimeout: any;
  menuOpen = false;
  constructor(private router: Router) {}

  scrollToAboutSection(navButton = true) {
    this.router.navigate(['/'], { fragment: 'about' }).then(() => {
      // Wait for DOM to settle, then scroll manually
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // adjust if needed
    });
    if (navButton) {
      this.menuOpen = !this.menuOpen;
    }
  }
  goToServices(navButton = true) {
    this.router.navigate(['/services']);
    if (navButton) this.menuOpen = !this.menuOpen;
  }

  goToGallery(navButton = true) {
    this.router.navigate(['/gallery']);
    if (navButton) this.menuOpen = !this.menuOpen;
  }
  goToHome(navButton = true) {
    this.router.navigate(['/']);
    if (navButton) this.menuOpen = !this.menuOpen;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu() {
    this.menuOpen = false;
  }
}
