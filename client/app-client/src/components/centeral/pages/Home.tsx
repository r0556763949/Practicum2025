
import { ArrowLeft, FileText, Upload, Cloud, MessageSquare, Users, Shield, CheckCircle, Zap } from "lucide-react"

const SystemHome = () => {

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

