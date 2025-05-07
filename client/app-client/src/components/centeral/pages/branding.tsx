"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Building2,
  Mail,
  MapPin,
  Phone,
  Star,
  ImageIcon,
  ChevronDown,
  ChevronUp,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react"

const BrandingPage = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
    hero: null,
    about: null,
    testimonials: null,
    contact: null,
    gallery: null,
  })

  const handleLoginClick = () => {
    // Trigger the login popup from the header
    const loginButton = document.querySelector(".account-button") as HTMLButtonElement
    if (loginButton) loginButton.click()
  }

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 100

    // Check which section is currently in view
    Object.entries(sectionRefs.current).forEach(([section, ref]) => {
      if (!ref) return

      const offsetTop = ref.offsetTop
      const height = ref.offsetHeight

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
        setActiveSection(section)
      }
    })

    // Show/hide floating nav based on scroll position
    if (scrollPosition > 300) {
      setIsNavVisible(true)
    } else {
      setIsNavVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (section: string) => {
    const ref = sectionRefs.current[section]
    if (ref) {
      window.scrollTo({
        top: ref.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="branding-page">
      {/* Floating Navigation */}
      <div className={`floating-nav ${isNavVisible ? "visible" : ""}`}>
        <div className="floating-nav-content">
          <div className="floating-nav-logo" onClick={() => scrollToSection("hero")}>
            <Building2 className="floating-logo-icon" />
            <span>ESTI MUNK</span>
          </div>
          <div className="floating-nav-links">
            <button
              className={`floating-nav-link ${activeSection === "about" ? "active" : ""}`}
              onClick={() => scrollToSection("about")}
            >
              אודות
            </button>
            <button
              className={`floating-nav-link ${activeSection === "testimonials" ? "active" : ""}`}
              onClick={() => scrollToSection("testimonials")}
            >
              לקוחות ממליצים
            </button>
            <button
              className={`floating-nav-link ${activeSection === "gallery" ? "active" : ""}`}
              onClick={() => scrollToSection("gallery")}
            >
              גלריה
            </button>
            <button
              className={`floating-nav-link ${activeSection === "contact" ? "active" : ""}`}
              onClick={() => scrollToSection("contact")}
            >
              צור קשר
            </button>
          </div>
          <button className="floating-login-button" onClick={handleLoginClick}>
            כניסה למערכת
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="branding-hero" ref={(el) => (sectionRefs.current.hero = el)} id="hero">
        <div className="branding-hero-content">
          <h1 className="branding-hero-title">
            <span className="title-highlight">אסתי מונק</span>
            <br />
            אדריכלות ועיצוב פנים
          </h1>
          <p className="branding-hero-description">
            יצירת מרחבים מעוצבים המשלבים פונקציונליות ואסתטיקה, עם דגש על פרטים ואיכות ללא פשרות
          </p>
          <div className="branding-hero-buttons">
            <button className="branding-primary-button" onClick={handleLoginClick}>
              <span>כניסה למערכת</span>
              <ArrowLeft className="button-icon" />
            </button>
            <button className="branding-secondary-button" onClick={() => scrollToSection("contact")}>
              <span>צור קשר</span>
              <ChevronDown className="button-icon" />
            </button>
          </div>
        </div>
        <div className="branding-hero-image">
          <div className="image-overlay"></div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection("about")}>
          <span>גלול למטה</span>
          <ChevronDown className="scroll-icon" />
        </div>
      </section>

      {/* About Section */}
      <section className="branding-about" ref={(el) => (sectionRefs.current.about = el)} id="about">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">אודות</h2>
            <div className="section-divider"></div>
          </div>

          <div className="about-content">
            <div className="about-image">
              <div className="image-frame">
                <img src="/placeholder.svg?height=600&width=400" alt="אסתי מונק" className="architect-image" />
              </div>
            </div>
            <div className="about-text">
              <h3 className="about-name">אסתי מונק</h3>
              <h4 className="about-title">אדריכלית ומעצבת פנים</h4>
              <p className="about-description">
                אסתי מונק היא אדריכלית ומעצבת פנים בעלת ניסיון רב בתכנון ועיצוב מבנים ומרחבים. הסטודיו מתמחה בתכנון
                אדריכלי, עיצוב פנים וליווי פרויקטים מתחילתם ועד סופם.
              </p>
              <p className="about-description">
                בוגרת הפקולטה לאדריכלות בטכניון, אסתי מביאה לכל פרויקט ראייה מקצועית וחדשנית, תוך שימת דגש על צרכי הלקוח
                והתאמת התכנון לאורח חייו.
              </p>
              <p className="about-description">
                הגישה המקצועית של אסתי משלבת יצירתיות, פונקציונליות ואסתטיקה, תוך הקפדה על פרטים ואיכות ללא פשרות.
                הסטודיו מלווה את הלקוח לאורך כל שלבי הפרויקט, מהתכנון הראשוני ועד לביצוע הסופי.
              </p>

              <div className="about-expertise">
                <div className="expertise-item">
                  <div className="expertise-icon">
                    <Building2 />
                  </div>
                  <div className="expertise-text">
                    <h5>תכנון אדריכלי</h5>
                    <p>תכנון מבנים חדשים ושיפוץ מבנים קיימים</p>
                  </div>
                </div>
                <div className="expertise-item">
                  <div className="expertise-icon">
                    <MapPin />
                  </div>
                  <div className="expertise-text">
                    <h5>עיצוב פנים</h5>
                    <p>עיצוב חללים פנימיים המשלבים אסתטיקה ופונקציונליות</p>
                  </div>
                </div>
                <div className="expertise-item">
                  <div className="expertise-icon">
                    <Star />
                  </div>
                  <div className="expertise-text">
                    <h5>ליווי פרויקטים</h5>
                    <p>ליווי מקצועי לאורך כל שלבי הפרויקט</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="branding-testimonials"
        ref={(el) => (sectionRefs.current.testimonials = el)}
        id="testimonials"
      >
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">לקוחות ממליצים</h2>
            <div className="section-divider"></div>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "עבדנו עם אסתי על תכנון ועיצוב הבית החדש שלנו, והתוצאה עלתה על כל ציפיותינו. היא הקשיבה לכל הצרכים
                  שלנו והצליחה לתרגם אותם לתכנון מושלם. הליווי המקצועי והזמינות לאורך כל הדרך היו יוצאי דופן."
                </p>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src="/placeholder.svg?height=100&width=100" alt="משפחת כהן" />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">משפחת כהן</h4>
                    <p className="author-project">בית פרטי, רמת השרון</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "אסתי ליוותה אותנו בשיפוץ דירתנו, והצליחה להפוך חלל מיושן לדירה מודרנית ומרווחת. היא הבינה בדיוק את
                  הסגנון שרצינו והציעה פתרונות יצירתיים שלא חשבנו עליהם. ממליצים בחום!"
                </p>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src="/placeholder.svg?height=100&width=100" alt="רונית ודני" />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">רונית ודני</h4>
                    <p className="author-project">שיפוץ דירה, תל אביב</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "שכרנו את שירותיה של אסתי לתכנון משרדי החברה החדשים שלנו. היא יצרה עבורנו חלל עבודה מעוצב, פונקציונלי
                  ומזמין שקיבל תגובות נלהבות מעובדים ולקוחות כאחד. המקצועיות והיצירתיות שלה הן ברמה הגבוהה ביותר."
                </p>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src="/placeholder.svg?height=100&width=100" alt="אלון גרינברג" />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">אלון גרינברג</h4>
                    <p className="author-project">משרדי חברת טכנולוגיה, הרצליה</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="branding-gallery" ref={(el) => (sectionRefs.current.gallery = el)} id="gallery">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">גלריית פרויקטים</h2>
            <div className="section-divider"></div>
          </div>

          <div className="gallery-preview">
            <div className="gallery-item large">
              <img src="/placeholder.svg?height=600&width=800" alt="פרויקט 1" />
              <div className="gallery-overlay">
                <h3>בית פרטי</h3>
                <p>רמת השרון</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src="/placeholder.svg?height=400&width=400" alt="פרויקט 2" />
              <div className="gallery-overlay">
                <h3>דירת גן</h3>
                <p>תל אביב</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src="/placeholder.svg?height=400&width=400" alt="פרויקט 3" />
              <div className="gallery-overlay">
                <h3>משרדים</h3>
                <p>הרצליה פיתוח</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src="/placeholder.svg?height=400&width=400" alt="פרויקט 4" />
              <div className="gallery-overlay">
                <h3>פנטהאוז</h3>
                <p>נתניה</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src="/placeholder.svg?height=400&width=400" alt="פרויקט 5" />
              <div className="gallery-overlay">
                <h3>מסעדה</h3>
                <p>ירושלים</p>
              </div>
            </div>
          </div>

          <div className="gallery-cta">
            <button className="branding-primary-button" onClick={handleLoginClick}>
              <span>לצפייה בכל הפרויקטים</span>
              <ImageIcon className="button-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="branding-contact" ref={(el) => (sectionRefs.current.contact = el)} id="contact">
        <div className="section-container">
          <div className="section-header light">
            <h2 className="section-title">צור קשר</h2>
            <div className="section-divider"></div>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <h3 className="contact-subtitle">נשמח לשמוע ממך</h3>
              <p className="contact-description">
                מעוניינים לשמוע עוד על השירותים שלנו? צרו איתנו קשר ונשמח לענות על כל שאלה.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <span>054.8458693</span>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <span>Munk0548458693@gmail.com</span>
                </div>
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <span>רחוב הברוש 5, רמת השרון</span>
                </div>
              </div>

              <div className="contact-social">
                <a href="#" className="social-link">
                  <Instagram className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <Facebook className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <Linkedin className="social-icon" />
                </a>
              </div>
            </div>

            <div className="contact-form-container">
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">שם מלא</label>
                  <input type="text" id="name" placeholder="הזן את שמך המלא" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">דואר אלקטרוני</label>
                  <input type="email" id="email" placeholder="הזן את כתובת הדואר האלקטרוני שלך" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">טלפון</label>
                  <input type="tel" id="phone" placeholder="הזן את מספר הטלפון שלך" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">הודעה</label>
                  <textarea id="message" rows={4} placeholder="כתוב את הודעתך כאן"></textarea>
                </div>
                <button type="submit" className="form-submit">
                  <span>שליחה</span>
                  <ArrowLeft className="button-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button className="back-to-top" onClick={() => scrollToSection("hero")}>
        <ChevronUp className="back-to-top-icon" />
      </button>
    </div>
  )
}

export default BrandingPage
