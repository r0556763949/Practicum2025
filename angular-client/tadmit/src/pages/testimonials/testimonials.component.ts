import { Component, type OnInit } from "@angular/core"
import  { ApiService } from "../../services/api.service"
import  { Testimonial } from "../../models/testimonial.model"
import { RouterLink } from "@angular/router"
import { TestimonialCardComponent } from "../../components/testimonial-card/testimonial-card.component"
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component"
import { ContactFormComponent } from "../../components/contact-form/contact-form.component"

@Component({
  selector: "app-testimonials",
  imports:[RouterLink,TestimonialCardComponent,LoadingSpinnerComponent,ContactFormComponent],
  templateUrl: "./testimonials.component.html",
  styleUrls: ["./testimonials.component.scss"],
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = []
  loading = true
  error = ""

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTestimonials()
  }

  loadTestimonials() {
    this.apiService.getTestimonials().subscribe({
      next: (testimonials) => {
        this.testimonials = testimonials
        this.loading = false
      },
      error: (error) => {
        this.error = "אירעה שגיאה בטעינת ההמלצות"
        this.loading = false
        console.error("Error loading testimonials:", error)
      },
    })
  }
}
