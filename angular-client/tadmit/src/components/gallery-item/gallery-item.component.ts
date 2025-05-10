import { Component, Input, Output, EventEmitter } from "@angular/core"
import  { Project } from "../../models/project.model"

@Component({
  selector: "app-gallery-item",
  standalone:true,
  templateUrl: "./gallery-item.component.html",
  styleUrls: ["./gallery-item.component.scss"],
})
export class GalleryItemComponent {
  @Input() project!: Project
  @Output() viewImage = new EventEmitter<Project>()

  onViewImage() {
    this.viewImage.emit(this.project)
  }
}
