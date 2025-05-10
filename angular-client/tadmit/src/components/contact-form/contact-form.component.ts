import { Component, type OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import  { ApiService } from "../../services/api.service"

@Component({
  selector: "app-contact-form",
  imports:[ReactiveFormsModule],
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup
  isSubmitting = false
  submitSuccess = false
  submitError = false
  errorMessage = ""

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]],
      message: ["", [Validators.required, Validators.minLength(10)]],
    })
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm)
      return
    }

    this.isSubmitting = true
    this.submitSuccess = false
    this.submitError = false

    this.apiService.submitContactForm(this.contactForm.value).subscribe({
      next: () => {
        this.isSubmitting = false
        this.submitSuccess = true
        this.contactForm.reset()
      },
      error: (error) => {
        this.isSubmitting = false
        this.submitError = true
        this.errorMessage = error.message || "אירעה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר."
      },
    })
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched()
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup)
      }
    })
  }
}
