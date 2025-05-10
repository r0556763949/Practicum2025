import { Component } from "@angular/core"
import { ContactFormComponent } from "../../components/contact-form/contact-form.component"

@Component({
  selector: "app-contact",
  imports:[ContactFormComponent],
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent {
  contactInfo = {
    phone: "054.8458693",
    email: "Munk0548458693@gmail.com",
    address: "רחוב הברוש 5, רמת השרון",
  }
}
