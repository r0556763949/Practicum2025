import { Component, Input } from "@angular/core"
import  { Testimonial } from "../../models/testimonial.model"

@Component({
  selector: "app-testimonial-card",
  templateUrl: "./testimonial-card.component.html",
  styleUrls: ["./testimonial-card.component.scss"],
})
export class TestimonialCardComponent {
  @Input() testimonial!: Testimonial

  get starsArray(): number[] {
    return Array(this.testimonial.rating).fill(0)
  }
}
