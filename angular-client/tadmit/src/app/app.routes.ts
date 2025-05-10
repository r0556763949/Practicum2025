import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { AboutComponent } from '../pages/about/about.component';
import { GalleryComponent } from '../pages/gallery/gallery.component';
import { TestimonialsComponent } from '../pages/testimonials/testimonials.component';
import { ContactComponent } from '../pages/contact/contact.component';


export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "gallery", component: GalleryComponent },
    { path: "testimonials", component: TestimonialsComponent },
    { path: "contact", component: ContactComponent },
    { path: "**", redirectTo: "" },
];
