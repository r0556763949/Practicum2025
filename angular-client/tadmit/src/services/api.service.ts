import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import  { Observable, of } from "rxjs"
import  { Project } from "../models/project.model"
import  { Testimonial } from "../models/testimonial.model"
import  { ContactForm } from "../models/contact-form.model"
import { environment } from "../environments/environment"
import { log } from "console"

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  private mockProjects: Project[] = [
    {
      id: 1,
      title: "פרויקט הדמיה 1",
      description: "תיאור לפרויקט הדמיה ראשון",
      location: "תל אביב",
      year: 2022,
      imageUrl: "assets/images/project1.jpg",
      thumbnailUrl: "assets/images/thumb1.jpg",
      category: "מגורים",
    },
    {
      id: 2,
      title: "פרויקט הדמיה 2",
      description: "תיאור לפרויקט הדמיה שני",
      location: "ירושלים",
      year: 2021,
      imageUrl: "assets/images/project2.jpg",
      thumbnailUrl: "assets/images/thumb2.jpg",
      category: "מסחרי",
    },
    {
      id: 3,
      title: "פרויקט הדמיה 2",
      description: "תיאור לפרויקט הדמיה שני",
      location: "ירושלים",
      year: 2021,
      imageUrl: "assets/images/project2.jpg",
      thumbnailUrl: "assets/images/thumb2.jpg",
      category: "מסחרי",
    },
  ];

  // נתוני דמה להמלצות
  private mockTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "דני כהן",
      project: "בניין מגורים יוקרתי",
      content: "חוויה מדהימה! השירות והביצוע היו מעולים.iiiiiiiiii\nhhhhhhhhhhhhhh\nhh\n\nuuuuuuuuu\ngg hghj",
      rating: 5,
      imageUrl: "assets/images/testimonial1.jpg",
    },
    {
      id: 2,
      name: "שרה לוי",
      project: "מרכז מסחרי מודרני",
      content: "שירות מקצועי ויחס אישי.",
      rating: 4,
    },
    {
      id: 3,
      name: "שרה לוי",
      project: "מרכז מסחרי מודרני",
      content: "שירות מקצועי ויחס אישי.",
      rating: 4,
    },
    {
      id: 3,
      name: "שרה לוי",
      project: "מרכז מסחרי מודרני",
      content: "שירות מקצועי ויחס אישי.",
      rating: 4,
    },
    {
      id: 3,
      name: "שרה לוי",
      project: "מרכז מסחרי מודרני",
      content: "שירות מקצועי ויחס אישי.",
      rating: 4,
    },
    {
      id: 3,
      name: "שרה לוי",
      project: "מרכז מסחרי מודרני",
      content: "שירות מקצועי ויחס אישי.",
      rating: 4,
    },
    {
      id: 3,
      name: "שרה לוי",
      project: "מרכז מסחרי מודרני",
      content: "שירות מקצועי ויחס אישי.",
      rating: 4,
    },
  ];


  getProjects(): Observable<Project[]> {
    // return this.http.get<Project[]>(`${this.apiUrl}/projects`)
    return of(this.mockProjects);
  }

  getTestimonials(): Observable<Testimonial[]> {
    // return this.http.get<Testimonial[]>(`${this.apiUrl}/testimonials`)
    return of(this.mockTestimonials);
  }

  submitContactForm(formData: ContactForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, formData)
    console.log("submit!");
    
  }
}
