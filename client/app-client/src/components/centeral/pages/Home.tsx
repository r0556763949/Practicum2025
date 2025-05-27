
// "use client"

// import { useNavigate } from "react-router-dom"
// import { ArrowLeft, Building, Clock, Compass, MapPin, Ruler, Users } from "lucide-react"

// const Home = () => {
//   const navigate = useNavigate()

//   const handleLoginClick = () => {
//     // Trigger the login popup from the header
//     const loginButton = document.querySelector(".account-button") as HTMLButtonElement
//     if (loginButton) loginButton.click()
//   }

//   return (
//     <div className="home-page">
//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1 className="hero-title">אסתי מונק</h1>
//           <h2 className="hero-subtitle">עיצוב ותכנון אדריכלי</h2>
//           <p className="hero-description">יצירת מרחבים מעוצבים המשלבים פונקציונליות ואסתטיקה</p>
//           <button className="hero-button" onClick={handleLoginClick}>
//             <span>התחברות למערכת</span>
//             <ArrowLeft className="button-icon" />
//           </button>
//         </div>
//         <div className="hero-image-container">
//           <div className="hero-image"></div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="services-section">
//         <h2 className="section-title">השירותים שלנו</h2>
//         <div className="services-grid">
//           <div className="service-card">
//             <div className="service-icon-container">
//               <Building className="service-icon" />
//             </div>
//             <h3 className="service-title">תכנון אדריכלי</h3>
//             <p className="service-description">תכנון מבנים חדשים ושיפוץ מבנים קיימים בהתאם לצרכים ולחזון שלך</p>
//           </div>

//           <div className="service-card">
//             <div className="service-icon-container">
//               homeicon
//               {/* <Home className="service-icon" /> */}
//             </div>
//             <h3 className="service-title">עיצוב פנים</h3>
//             <p className="service-description">עיצוב חללים פנימיים המשלבים אסתטיקה, נוחות ופונקציונליות</p>
//           </div>

//           <div className="service-card">
//             <div className="service-icon-container">
//               <Ruler className="service-icon" />
//             </div>
//             <h3 className="service-title">תכנון טכני</h3>
//             <p className="service-description">הכנת תוכניות עבודה מפורטות, מפרטים טכניים ופרטי בנייה</p>
//           </div>

//           <div className="service-card">
//             <div className="service-icon-container">
//               <Users className="service-icon" />
//             </div>
//             <h3 className="service-title">ליווי פרויקטים</h3>
//             <p className="service-description">ליווי מקצועי לאורך כל שלבי הפרויקט, מהתכנון ועד לביצוע</p>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="about-section">
//         <div className="about-content">
//           <h2 className="section-title">אודות</h2>
//           <p className="about-description">
//             אסתי מונק היא אדריכלית בעלת ניסיון רב בתכנון ועיצוב מבנים ומרחבים. הסטודיו מתמחה בתכנון אדריכלי, עיצוב פנים
//             וליווי פרויקטים מתחילתם ועד סופם.
//           </p>
//           <p className="about-description">
//             אנו מאמינים כי כל פרויקט הוא ייחודי ודורש התייחסות אישית, תוך הקשבה לצרכים ולרצונות של הלקוח. הגישה שלנו
//             משלבת יצירתיות, פונקציונליות ואסתטיקה, תוך שימת דגש על פרטים ואיכות.
//           </p>
//           <div className="about-values">
//             <div className="value-item">
//               <div className="value-icon">
//                 <Clock />
//               </div>
//               <div className="value-text">
//                 <h3>זמינות ועמידה בלוחות זמנים</h3>
//               </div>
//             </div>
//             <div className="value-item">
//               <div className="value-icon">
//                 <Compass />
//               </div>
//               <div className="value-text">
//                 <h3>ליווי מקצועי לאורך כל התהליך</h3>
//               </div>
//             </div>
//             <div className="value-item">
//               <div className="value-icon">
//                 <MapPin />
//               </div>
//               <div className="value-text">
//                 <h3>תכנון פונקציונלי ויצירתי</h3>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="about-image-container">
//           <div className="about-image"></div>
//         </div>
//       </section>

//       {/* Contact CTA Section */}
//       <section className="contact-section">
//         <div className="contact-content">
//           <h2 className="contact-title">מעוניינים לשמוע עוד?</h2>
//           <p className="contact-description">צרו קשר עוד היום ונשמח לענות על כל שאלה</p>
//           <button className="contact-button" onClick={handleLoginClick}>
//             <span>התחברות למערכת</span>
//             <ArrowLeft className="button-icon" />
//           </button>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Home

"use client"

import { useNavigate } from "react-router-dom"
import { ArrowLeft, FileText, Upload, Cloud, MessageSquare, Users, Shield, CheckCircle, Zap } from "lucide-react"

const SystemHome = () => {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    // Trigger the login popup from the header
    const loginButton = document.querySelector(".account-button") as HTMLButtonElement
    if (loginButton) loginButton.click()
  }

  return (
    <div className="system-home">
      {/* Hero Section */}
      <section className="system-hero">
        <div className="hero-content">
          <h1 className="system-title">מערכת ניהול פרויקטים אדריכליים</h1>
          <p className="system-description">
            פלטפורמה מתקדמת לניהול יעיל ומסודר של פרויקטים אדריכליים, המאפשרת תקשורת חלקה בין האדריכל ללקוח
          </p>
          <button className="login-button" onClick={handleLoginClick}>
            <span>התחברות למערכת</span>
            <ArrowLeft className="button-icon" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">יכולות המערכת</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FileText />
            </div>
            <h3 className="feature-title">שאלוני מיקוד והכוונה</h3>
            <p className="feature-description">
              מילוי שאלונים דיגיטליים לאיסוף דרישות ועדיפויות הלקוח בצורה מסודרת ויעילה
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Upload />
            </div>
            <h3 className="feature-title">העלאת תוכניות</h3>
            <p className="feature-description">העלאה ושיתוף של סדרות תוכניות, שרטוטים וקבצים בפורמטים שונים</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Cloud />
            </div>
            <h3 className="feature-title">גיבוי אוטומטי בענן</h3>
            <p className="feature-description">שמירה אוטומטית ובטוחה של כל הקבצים והנתונים בענן עם גישה מכל מקום</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <MessageSquare />
            </div>
            <h3 className="feature-title">הערות ותקשורת</h3>
            <p className="feature-description">הוספת הערות והערות של הלקוח והאדריכל ישירות על התוכניות</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-content">
          <h2 className="benefits-title">למה לבחור במערכת שלנו?</h2>
          <div className="benefits-list">
            <div className="benefit-item">
              <CheckCircle className="benefit-icon" />
              <div className="benefit-text">
                <h4>תקשורת מסודרת</h4>
                <p>ארגון כל התקשורת והמידע במקום אחד נגיש</p>
              </div>
            </div>

            <div className="benefit-item">
              <Shield className="benefit-icon" />
              <div className="benefit-text">
                <h4>אבטחה מתקדמת</h4>
                <p>הגנה מלאה על הנתונים והקבצים שלכם</p>
              </div>
            </div>

            <div className="benefit-item">
              <Users className="benefit-icon" />
              <div className="benefit-text">
                <h4>שיתוף פעולה יעיל</h4>
                <p>עבודה משותפת חלקה בין האדריכל ללקוח</p>
              </div>
            </div>

            <div className="benefit-item">
              <Zap className="benefit-icon" />
              <div className="benefit-text">
                <h4>חסכון בזמן</h4>
                <p>ייעול תהליכי העבודה והפחתת זמני המתנה</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">מוכנים להתחיל?</h2>
          <p className="cta-description">הצטרפו למערכת עוד היום ותחוו ניהול פרויקטים אדריכליים בצורה חדשה ויעילה</p>
          <button className="cta-button" onClick={handleLoginClick}>
            <span>כניסה למערכת</span>
            <ArrowLeft className="button-icon" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default SystemHome

