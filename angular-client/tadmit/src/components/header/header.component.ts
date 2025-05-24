import { CommonModule } from "@angular/common"
import { Component, HostListener } from "@angular/core"
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router"



@Component({
  selector: "app-header",
  imports:[RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    CommonModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isScrolled = false
  isMobileMenuOpen = false

  constructor(private router: Router) {}

  @HostListener("window:scroll")
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false
  }

  navigateToSystem() {
    // Navigate to your React app
    window.location.href = "http://localhost:5173"
  }
}
