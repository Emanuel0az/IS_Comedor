import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import './Footer.css'

export default function Footer() {
  return (
    <footer className="simple-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="company-name">
            <h2>Mi Empresa</h2>
          </div>
          <div className="contact-social">
            <div className="contact-info">
              <h3>Contacto</h3>
              <p>info@miempresa.com</p>
              <p>(123) 456-7890</p>
            </div>
            <div className="social-links">
              <h3>Síguenos</h3>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <Facebook />
                </a>
                <a href="#" aria-label="Twitter">
                  <Twitter />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}