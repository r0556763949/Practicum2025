import { Component, type OnInit } from "@angular/core"
import  { ApiService } from "../../services/api.service"
import  { Project } from "../../models/project.model"
import { GalleryItemComponent } from "../../components/gallery-item/gallery-item.component"
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component"
import { ImageModalComponent } from "../../components/image-modal/image-modal.component"

@Component({
  selector: "app-gallery",
  imports:[GalleryItemComponent,LoadingSpinnerComponent,ImageModalComponent],
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent implements OnInit {
  projects: Project[] = []
  filteredProjects: Project[] = []
  categories: string[] = []
  loading = true
  error = ""
  selectedProject: Project | null = null
  activeCategory = "all"

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadProjects()
  }

  loadProjects() {
    this.apiService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects
        this.filteredProjects = [...projects]
        this.extractCategories()
        this.loading = false
      },
      error: (error) => {
        this.error = "אירעה שגיאה בטעינת הפרויקטים"
        this.loading = false
        console.error("Error loading projects:", error)
      },
    })
  }

  extractCategories() {
    const categoriesSet = new Set<string>()
    this.projects.forEach((project) => {
      if (project.category) {
        categoriesSet.add(project.category)
      }
    })
    this.categories = Array.from(categoriesSet)
  }

  filterByCategory(category: string) {
    this.activeCategory = category

    if (category === "all") {
      this.filteredProjects = [...this.projects]
    } else {
      this.filteredProjects = this.projects.filter((project) => project.category === category)
    }
  }

  viewProjectDetails(project: Project) {
    this.selectedProject = project
  }

  closeProjectDetails() {
    this.selectedProject = null
  }
}
