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
  private ProjectsheetUrl = 'https://docs.google.com/spreadsheets/d/1I95SNph73WzKNlHxrB-RwHGlxmzAKvNzJ2DXNUD3qVc/gviz/tq?tqx=out:json';
  private testimonialSheetUrl = 'https://docs.google.com/spreadsheets/d/1O-0HN60l0oyr1mYS0KKHKcrHHoEee7u2p32j45IXxtI/gviz/tq?tqx=out:json';

  constructor(private http: HttpClient) {}


  getProjects(): Observable<Project[]> {
    return new Observable<Project[]>((observer) => {
      this.http.get(this.ProjectsheetUrl, { responseType: 'text' }).subscribe({
        next: (res) => {
          const json = JSON.parse(res.substring(47, res.length - 2)); // הסרת עטיפת הפונקציה של Google
          const rows = json.table.rows;
  
          const projects: Project[] = rows.map((row:any, index:any) => {
            const c = row.c;
            return {
              id: Number(c[0]?.v) || 0,
              title: c[1]?.v || '',
              description: c[2]?.v || '',
              location: c[3]?.v || '',
              year: Number(c[4]?.v) || 0,
              imageUrl: c[5]?.v || '',
              thumbnailUrl: c[6]?.v || '',
              category: c[7]?.v || '',
            };
          });
          console.log("projects: "+projects[0].imageUrl);
          
          observer.next(projects);
          observer.complete();
        },
        error: (err) => {
          console.error('שגיאה בשליפת נתונים מגוגל שיט', err);
          observer.error(err);
        }
      });
    });
  }

  getTestimonials(): Observable<Testimonial[]> {
    return new Observable<Testimonial[]>((observer) => {
      this.http.get(this.testimonialSheetUrl, { responseType: 'text' }).subscribe({
        next: (res) => {
          const json = JSON.parse(res.substring(47, res.length - 2));
          const rows = json.table.rows;
  
          const testimonials: Testimonial[] = rows.map((row: any) => {
            const c = row.c;
            return {
              id: Number(c[0]?.v) || 0,
              name: c[1]?.v || '',
              project: c[2]?.v || '',
              content: c[3]?.v || '',
              rating: Number(c[4]?.v) || 0,
              imageUrl: c[5]?.v || '',
            };
          });
  
          observer.next(testimonials);
          observer.complete();
        },
        error: (err) => {
          console.error('שגיאה בשליפת המלצות מהשיט', err);
          observer.error(err);
        }
      });
    });
  }

  submitContactForm(data:ContactForm):Observable<any>{
    return this.http.post(this.apiUrl+"/Email/ContactForm",data);
  }
}
