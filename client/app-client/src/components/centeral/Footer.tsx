
// import logo from "../../images/LOGO1.png"; // עדכני את הנתיב לתמונה שלך

// const Footer = () => {
//   return (
//     <footer className="footer">
//             <img src={logo} alt="Footer Logo" className="footer-image" />
//     </footer>
//   );
// };

// export default Footer;

"use client"

import { Building2, Clock, Mail, MapPin, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand" onClick={() => navigate("/")}>
          <div className="footer-logo">
            <Building2 className="footer-logo-icon" />
            <div className="footer-logo-text">
              <h2 className="footer-title">ESTI MUNK</h2>
              <p className="footer-subtitle">אסתי מונק עיצוב ותכנון אדריכלי</p>
            </div>
          </div>
        </div>

        <div className="footer-services">
          <div className="service-item">
            <div className="service-icon">
              <Clock />
            </div>
            <div className="service-text">
              <h3>זמינות ועמידה</h3>
              <p>בלוחות זמנים</p>
            </div>
          </div>

          <div className="service-item">
            <div className="service-icon">
              <MapPin />
            </div>
            <div className="service-text">
              <h3>ליווי מקצועי</h3>
              <p>לאורך כל התהליך</p>
            </div>
          </div>
        </div>

        <div className="footer-contact">
          <div className="contact-item">
            <Mail className="contact-icon" />
            <span>Munk0548458693@gmail.com</span>
          </div>
          <div className="contact-item">
            <Phone className="contact-icon" />
            <span>054.8458693</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="#003366"
              fillOpacity="0.5"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} ESTI MUNK. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer





