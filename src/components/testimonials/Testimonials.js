import React, {useState, useContext} from "react";
import "./Testimonials.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Testimonials() {
  const {isDark} = useContext(StyleContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Jugal's ability to translate complex data requirements into production-ready systems is exceptional. The procurement platform he built serves 200+ users daily with zero complaints.",
      name: "Alex Chen",
      role: "Director of Engineering",
      company: "VaynerX"
    },
    {
      quote:
        "Working with Jugal on real-time pipelines was a game-changer. He optimized our ETL processes by 40% and made our data infrastructure truly scalable.",
      name: "Sarah Martinez",
      role: "VP of Data",
      company: "VaynerMedia"
    },
    {
      quote:
        "His full-stack capabilities are rare in data engineering. Jugal doesn't just build pipelines—he creates complete data products that business users actually love.",
      name: "Michael Johnson",
      role: "Product Manager",
      company: "Tech Startup"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((activeIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (activeIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="testimonials-container">
      <Fade bottom duration={1000} distance="20px">
        <h2
          className={
            isDark ? "dark-mode testimonials-title" : "testimonials-title"
          }
        >
          What People Say
        </h2>
        <p
          className={
            isDark
              ? "dark-mode testimonials-subtitle subTitle"
              : "testimonials-subtitle subTitle"
          }
        >
          Feedback from colleagues and collaborators
        </p>
      </Fade>

      <div className="testimonials-carousel">
        <Fade key={activeIndex} duration={600}>
          <div
            className={
              isDark ? "testimonial-card dark-mode" : "testimonial-card"
            }
          >
            <div className="quote-icon">"</div>
            <p
              className={
                isDark ? "dark-mode testimonial-quote" : "testimonial-quote"
              }
            >
              {testimonials[activeIndex].quote}
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">
                {testimonials[activeIndex].name
                  .split(" ")
                  .map(n => n[0])
                  .join("")}
              </div>
              <div className="author-info">
                <div
                  className={isDark ? "dark-mode author-name" : "author-name"}
                >
                  {testimonials[activeIndex].name}
                </div>
                <div
                  className={isDark ? "dark-mode author-role" : "author-role"}
                >
                  {testimonials[activeIndex].role} •{" "}
                  {testimonials[activeIndex].company}
                </div>
              </div>
            </div>
          </div>
        </Fade>

        {/* Navigation */}
        <div className="carousel-navigation">
          <button
            className={isDark ? "nav-btn prev dark-mode" : "nav-btn prev"}
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeIndex ? "active" : ""} ${
                  isDark ? "dark-mode" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            className={isDark ? "nav-btn next dark-mode" : "nav-btn next"}
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
