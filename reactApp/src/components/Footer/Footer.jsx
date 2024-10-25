import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import './Footer.css'
import { useNavigate } from "react-router-dom"

export default function Footer() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/email")
  }
  const handleClick2 = () => {
    window.location.href = 'https://www.facebook.com/fwdcostarica/';
  }
  const handleClick3 = () => {
    window.location.href = 'https://www.instagram.com/fwdcostarica/';
  }
  const handleClick4 = () => {
    window.location.href = 'https://www.linkedin.com/company/fwd-costa-rica/';
  }

  return (
    <footer className="simple-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="company-name">
            <h1>Forward</h1>
          </div>
          <div className="contact-social">
            <div className="contact-info">
              <h3>Contacto</h3>
              <p onClick={handleClick}>contacto@fwdcostarica.com</p>
              <p>Tel: +506 7202 5228</p>
            </div>
            <div className="social-links">
              <h3>Síguenos</h3>
              <div className="social-icons">
                <a href="#" aria-label="Facebook" onClick={handleClick2}>
                  <Facebook />
                </a>
                <a href="#" aria-label="Instagram" onClick={handleClick3}>
                  <Instagram />
                </a>
                <a href="#" aria-label="LinkedIn" onClick={handleClick4}>
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} FWD Costa Rica. Tech & Freedom.</p>
        </div>
      </div>
    </footer>
  )
}