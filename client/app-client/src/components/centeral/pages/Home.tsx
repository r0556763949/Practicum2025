
// const Home = () => {
    
//     return (
//         <div className="home-page">
//             <div className="home-content">
//                 <h1>HOME</h1>
//             </div>
//         </div>

//     );
// };


// export default Home;

// const styles = `
//     body, html {
//         margin: 0;
//         padding: 0;
//         width: 100%;
//         height: 100%;
//     }

//     .home-page {
//         display: flex;
//         flex-direction: column;
//         min-height: 100vh;
//         width: 100%; /* מבטיח שהעמוד יתפרס על כל הרוחב */
//     }

//     .home-content {
//         flex: 1;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         text-align: center;
//         width: 100%;
//     }
// `;


// const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);


"use client"

import { useNavigate } from "react-router-dom"
import { ArrowLeft, Building, Clock, Compass, MapPin, Ruler, Users } from "lucide-react"

const Home = () => {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    // Trigger the login popup from the header
    const loginButton = document.querySelector(".account-button") as HTMLButtonElement
    if (loginButton) loginButton.click()
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">אסתי מונק</h1>
          <h2 className="hero-subtitle">עיצוב ותכנון אדריכלי</h2>
          <p className="hero-description">יצירת מרחבים מעוצבים המשלבים פונקציונליות ואסתטיקה</p>
          <button className="hero-button" onClick={handleLoginClick}>
            <span>התחברות למערכת</span>
            <ArrowLeft className="button-icon" />
          </button>
        </div>
        <div className="hero-image-container">
          <div className="hero-image"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">השירותים שלנו</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon-container">
              <Building className="service-icon" />
            </div>
            <h3 className="service-title">תכנון אדריכלי</h3>
            <p className="service-description">תכנון מבנים חדשים ושיפוץ מבנים קיימים בהתאם לצרכים ולחזון שלך</p>
          </div>

          <div className="service-card">
            <div className="service-icon-container">
              homeicon
              {/* <Home className="service-icon" /> */}
            </div>
            <h3 className="service-title">עיצוב פנים</h3>
            <p className="service-description">עיצוב חללים פנימיים המשלבים אסתטיקה, נוחות ופונקציונליות</p>
          </div>

          <div className="service-card">
            <div className="service-icon-container">
              <Ruler className="service-icon" />
            </div>
            <h3 className="service-title">תכנון טכני</h3>
            <p className="service-description">הכנת תוכניות עבודה מפורטות, מפרטים טכניים ופרטי בנייה</p>
          </div>

          <div className="service-card">
            <div className="service-icon-container">
              <Users className="service-icon" />
            </div>
            <h3 className="service-title">ליווי פרויקטים</h3>
            <p className="service-description">ליווי מקצועי לאורך כל שלבי הפרויקט, מהתכנון ועד לביצוע</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">אודות</h2>
          <p className="about-description">
            אסתי מונק היא אדריכלית בעלת ניסיון רב בתכנון ועיצוב מבנים ומרחבים. הסטודיו מתמחה בתכנון אדריכלי, עיצוב פנים
            וליווי פרויקטים מתחילתם ועד סופם.
          </p>
          <p className="about-description">
            אנו מאמינים כי כל פרויקט הוא ייחודי ודורש התייחסות אישית, תוך הקשבה לצרכים ולרצונות של הלקוח. הגישה שלנו
            משלבת יצירתיות, פונקציונליות ואסתטיקה, תוך שימת דגש על פרטים ואיכות.
          </p>
          <div className="about-values">
            <div className="value-item">
              <div className="value-icon">
                <Clock />
              </div>
              <div className="value-text">
                <h3>זמינות ועמידה בלוחות זמנים</h3>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <Compass />
              </div>
              <div className="value-text">
                <h3>ליווי מקצועי לאורך כל התהליך</h3>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <MapPin />
              </div>
              <div className="value-text">
                <h3>תכנון פונקציונלי ויצירתי</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="about-image-container">
          <div className="about-image"></div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="contact-section">
        <div className="contact-content">
          <h2 className="contact-title">מעוניינים לשמוע עוד?</h2>
          <p className="contact-description">צרו קשר עוד היום ונשמח לענות על כל שאלה</p>
          <button className="contact-button" onClick={handleLoginClick}>
            <span>התחברות למערכת</span>
            <ArrowLeft className="button-icon" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home


