import { CommonModule } from "@angular/common"
import { Component, HostListener } from "@angular/core"
import { Router, RouterLink, RouterLinkActive } from "@angular/router"
import { environment } from "../../environments/environment.prod"



@Component({
  selector: "app-header",
  imports:[
    RouterLink, 
    RouterLinkActive,
    CommonModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  systemUrl = environment.systemUrl;
  isScrolled=false
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
    window.location.href = environment.systemUrl 
  }
}
