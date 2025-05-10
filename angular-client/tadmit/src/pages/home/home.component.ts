import { Component, type OnInit } from "@angular/core"
import { ApiService } from "../../services/api.service"
import { Project } from "../../models/project.model"
import { Testimonial } from "../../models/testimonial.model"
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component"
import { ServiceCardComponent } from "../../components/service-card/service-card.component"
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component"
import { ProjectCardComponent } from "../../components/project-card/project-card.component"
import { TestimonialCardComponent } from "../../components/testimonial-card/testimonial-card.component"
import { ImageModalComponent } from "../../components/image-modal/image-modal.component"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [HeroSectionComponent,
    ServiceCardComponent,
    LoadingSpinnerComponent,
    ProjectCardComponent,
    TestimonialCardComponent,
  ImageModalComponent],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  featuredProjects: Project[] = []
  testimonials: Testimonial[] = []
  loadingProjects = true
  loadingTestimonials = true
  errorProjects = ""
  errorTestimonials = ""
  selectedProject: Project | null = null

  services = [
    {
      icon: "icon-building",
      title: "תכנון קונספטואלי וייצירתי",
      description: "תכנון מותאם אישית המשלב אסתטיקה, פונקציונליות וחדשנות",
    },
    {
      icon: "icon-blueprint",
      title: "סט תכניות עבודה מפורט",
      description: "הכנת תוכניות עבודה מפורטות, מפרטים טכניים ופרטי בנייה",
    },
    {
      icon: "icon-compass",
      title: "ליווי מקצועי",
      description: "ליווי מקצועי לאורך כל שלבי הפרויקט, מהתכנון ועד לביצוע",
    },
    {
      icon: "icon-clock",
      title: "זמינות ועמידה בלוחות זמנים",
      description: "מחויבות לזמינות גבוהה ועמידה בלוחות זמנים מוגדרים מראש",
    },
  ]

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadFeaturedProjects()
    this.loadTestimonials()
  }

  loadFeaturedProjects() {
    console.log("loadFeaturedProjects");
    this.apiService.getProjects().subscribe({
      next: (projects) => {
        this.featuredProjects = projects.slice(0, 4) // Get first 4 projects
        this.loadingProjects = false
      },
      error: (error) => {
        this.errorProjects = "אירעה שגיאה בטעינת הפרויקטים"
        this.loadingProjects = false
        console.error("Error loading projects:", error)
      },
    })
  }

  loadTestimonials() {
    this.apiService.getTestimonials().subscribe({
      next: (testimonials: any) => {
        this.testimonials = testimonials.slice(0, 3) // Get first 3 testimonials
        this.loadingTestimonials = false
      },
      error: (error) => {
        this.errorTestimonials = "אירעה שגיאה בטעינת ההמלצות"
        this.loadingTestimonials = false
        console.error("Error loading testimonials:", error)
      },
    })
  }

  viewProjectDetails(project: Project) {
    this.selectedProject = project
  }

  closeProjectDetails() {
    this.selectedProject = null
  }
}
