import { Component, Input, Output, EventEmitter } from "@angular/core"
import type { Project } from "../../models/project.model"

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.scss"],
})
export class ProjectCardComponent {
  @Input() project!: Project
  @Output() viewDetails = new EventEmitter<Project>()

  onViewDetails() {
    this.viewDetails.emit(this.project)
  }
}
