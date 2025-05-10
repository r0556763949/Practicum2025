import { Component, Input, Output, EventEmitter } from "@angular/core"
import  { Project } from "../../models/project.model"

@Component({
  selector: "app-image-modal",
  templateUrl: "./image-modal.component.html",
  styleUrls: ["./image-modal.component.scss"],
})
export class ImageModalComponent {
  @Input() project!: Project
  @Output() close = new EventEmitter<void>()

  onClose() {
    this.close.emit()
  }
}
