import React, {useState, useEffect, useContext, useRef} from "react";
import "./ConnectModal.scss";
import StyleContext from "../../contexts/StyleContext";
import {contactInfo, socialMediaLinks, calendlyConfig} from "../../portfolio";
import {
  trackButtonClick,
  trackCalendlyEvent,
  trackFormSubmission
} from "../../utils/analytics";
import {Fade} from "react-reveal";

export default function ConnectModal({isOpen, onClose}) {
  const {isDark} = useContext(StyleContext);
  const [activeTab, setActiveTab] = useState("email");
  const [showCalendly, setShowCalendly] = useState(false);
  const [formData, setFormData] = useState({name: "", email: "", message: ""});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef(null);
  const calendlyRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus trap
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    } else {
      document.body.style.overflow = "";
      setShowCalendly(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Load and initialize Calendly widget
  useEffect(() => {
    if (showCalendly && calendlyConfig?.enabled && calendlyConfig?.url) {
      trackCalendlyEvent("opened");

      // Initialize Calendly inline widget if script is loaded
      const initCalendly = () => {
        if (window.Calendly && calendlyRef.current) {
          window.Calendly.initInlineWidget({
            url: calendlyConfig.url,
            parentElement: calendlyRef.current
          });
        }
      };

      // Check if Calendly script is already loaded
      if (window.Calendly) {
        initCalendly();
      } else {
        // Wait for script to load (it's loaded in index.html)
        const checkCalendly = setInterval(() => {
          if (window.Calendly) {
            clearInterval(checkCalendly);
            initCalendly();
          }
        }, 100);

        // Timeout after 5 seconds
        setTimeout(() => {
          clearInterval(checkCalendly);
          if (!window.Calendly) {
            console.warn("Calendly script failed to load");
          }
        }, 5000);
      }
    }
  }, [showCalendly]);

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create mailto link with all form data
    const subject = encodeURIComponent(
      `Contact from ${formData.name} - Portfolio`
    );
    const body = encodeURIComponent(
      `Hi Jugal,\n\n` +
        `My name is ${formData.name}.\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `---\n` +
        `This message was sent from your portfolio website.`
    );

    // Track form submission
    trackFormSubmission("contact_form", true);

    // Open email client with pre-filled data
    window.location.href = `mailto:${contactInfo.email_address}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({name: "", email: "", message: ""});
    }, 2000);
  };

  const handleCalendlyClick = () => {
    setShowCalendly(true);
    setActiveTab("calendly");
    trackButtonClick("schedule_meeting", "connect_modal");
  };

  const connectionOptions = [
    {
      id: "email",
      label: "Email",
      icon: "✉️",
      color: "#3b82f6",
      action: () => {
        trackButtonClick("email", "connect_modal");
        window.location.href = `mailto:${contactInfo.email_address}`;
      }
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: "💼",
      color: "#0077b5",
      action: () => {
        trackButtonClick("linkedin", "connect_modal");
        window.open(socialMediaLinks.linkedin, "_blank");
      }
    },
    {
      id: "github",
      label: "GitHub",
      icon: "💻",
      color: "#333",
      action: () => {
        trackButtonClick("github", "connect_modal");
        window.open(socialMediaLinks.github, "_blank");
      }
    },
    {
      id: "phone",
      label: "Phone",
      icon: "📞",
      color: "#10b981",
      action: () => {
        trackButtonClick("phone", "connect_modal");
        window.location.href = `tel:${contactInfo.number}`;
      }
    }
  ];

  // Add Calendly option if enabled
  if (calendlyConfig?.enabled && calendlyConfig?.url) {
    connectionOptions.push({
      id: "calendly",
      label: "Schedule Meeting",
      icon: "📅",
      color: "#0069ff",
      action: handleCalendlyClick
    });
  }

  return (
    <div
      className={`connect-modal-overlay ${isDark ? "dark-mode" : ""}`}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <Fade bottom duration={400}>
        <div
          ref={modalRef}
          className={`connect-modal ${isDark ? "dark-mode" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="connect-modal-title"
        >
          {/* Close button */}
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Header */}
          <div className="modal-header">
            <h2 id="connect-modal-title" className="modal-title">
              Let's Connect! 🚀
            </h2>
            <p className="modal-subtitle">Choose how you'd like to reach out</p>
          </div>

          {/* Connection Options Grid */}
          <div className="connection-options">
            {connectionOptions.map(option => (
              <button
                key={option.id}
                className={`connection-option ${
                  activeTab === option.id ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab(option.id);
                  if (option.action) {
                    setTimeout(() => option.action(), 300);
                  }
                }}
                style={{
                  "--option-color": option.color
                }}
              >
                <div className="option-icon">{option.icon}</div>
                <div className="option-label">{option.label}</div>
                <div className="option-ripple"></div>
              </button>
            ))}
          </div>

          {/* Calendly Embed Section */}
          {showCalendly && calendlyConfig?.enabled && calendlyConfig?.url && (
            <div className="calendly-embed-section">
              <div className="calendly-header">
                <h3 className="calendly-title">Schedule a Meeting</h3>
                <button
                  className="calendly-close-btn"
                  onClick={() => {
                    setShowCalendly(false);
                    setActiveTab("email");
                  }}
                  aria-label="Close Calendly"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div
                className="calendly-inline-widget"
                style={{minWidth: "320px", height: "630px"}}
                ref={calendlyRef}
              ></div>
            </div>
          )}

          {/* Quick Contact Form */}
          <div className="modal-form-section">
            <h3 className="form-title">Or send a quick message</h3>
            <form onSubmit={handleSubmit} className="connect-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e =>
                    setFormData({...formData, name: e.target.value})
                  }
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={e =>
                    setFormData({...formData, email: e.target.value})
                  }
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={e =>
                    setFormData({...formData, message: e.target.value})
                  }
                  required
                  rows="4"
                  className="form-textarea"
                />
              </div>
              <button
                type="submit"
                className={`form-submit-btn ${
                  isSubmitting ? "submitting" : ""
                } ${submitted ? "submitted" : ""}`}
                disabled={isSubmitting || submitted}
              >
                {submitted ? (
                  <>
                    <span className="success-icon">✓</span>
                    <span>Message Sent!</span>
                  </>
                ) : isSubmitting ? (
                  <>
                    <span className="loader-spinner"></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="arrow-icon">→</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="modal-social-links">
            <p className="social-links-label">Connect on social media</p>
            <div className="social-icons">
              {socialMediaLinks.github && (
                <a
                  href={socialMediaLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
              )}
              {socialMediaLinks.linkedin && (
                <a
                  href={socialMediaLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              )}
              {socialMediaLinks.instagram && (
                <a
                  href={socialMediaLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}
