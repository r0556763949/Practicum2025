import { Component } from "@angular/core"

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent {
  values = [
    {
      icon: "icon-quality",
      title: "איכות ללא פשרות",
      description: "אנו מקפידים על סטנדרטים גבוהים בכל היבט של העבודה שלנו",
    },
    {
      icon: "icon-innovation",
      title: "חדשנות ויצירתיות",
      description: "אנו מביאים רעיונות חדשים ופתרונות יצירתיים לכל פרויקט",
    },
    {
      icon: "icon-client",
      title: "התאמה אישית ללקוח",
      description: "כל פרויקט מותאם לצרכים הייחודיים והסגנון האישי של הלקוח",
    },
    {
      icon: "icon-time",
      title: "עמידה בלוחות זמנים",
      description: "אנו מחויבים לעמידה בלוחות זמנים ותקציבים מוסכמים",
    },
  ]
}
