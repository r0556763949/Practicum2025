import { Component, Input } from "@angular/core"
import  { Router } from "@angular/router"

@Component({
  selector: "app-hero-section",
  standalone: true,
  templateUrl: "./hero-section.component.html",
  styleUrls: ["./hero-section.component.scss"],
})
export class HeroSectionComponent {
  @Input() title = "אסתי מונק"
  @Input() subtitle = "עיצוב ותכנון אדריכלי"
  @Input() description = "יצירת מרחבים מעוצבים המשלבים פונקציונליות ואסתטיקה"
  @Input() buttonText = "צור קשר"
  @Input() buttonLink = "/contact"
  @Input() backgroundImage = "../../images/image1.jpg"

  constructor(private router: Router) {}

  navigateTo() {
    this.router.navigate([this.buttonLink])
  }
}
