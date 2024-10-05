import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "../Layout"; // Import the Layout component
import ImageReveal from "../ImageReveal";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TestimonialCards = (data) => {
  const testimonialRef = useRef(null); // Create a ref for the testimonial section
  const testimonials = [...(data.data)]
  useEffect(() => {
    const items = gsap.utils.toArray(".testimonial-card");
    const testimonialElement = testimonialRef.current;

    const mm = gsap.matchMedia();

    // Stack card animation for mobile and tablets
    mm.add("(max-width: 1024px)", () => {
      items.forEach((item) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%", // Trigger animation when card is scrolled into view
            end: "bottom top", // End when the card leaves the view
            scrub: true,
            markers: false, // Set true if you want to debug
          },
        });

        // Stack animation: adjust scale and opacity based on scroll
        tl.fromTo(
          item,
          {
            opacity: 0,
            scale: 0.85,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          }
        );
      });

      // Cleanup ScrollTriggers on component unmount
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    // Cleanup on component unmount
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section className="min-h-screen ts" ref={testimonialRef} id="testimonials">
      <div className="flex justify-center items-center">
        <ImageReveal src="/test.png" alt="projects" cls={"pt-10 tsi ts"}/>
      </div>

      <section className="testimonial-section">
        {/* Keep the Layout inside the testimonial section without changing its position */}
        <div className="flex justify-center items-center">
          <Layout>
            <div className="testimonial-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-center gap-x-80 gap-y-12">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card drop w-96 h-96 p-8 text-center shadow-xl ">
                  <h2 className="text-2xl font-bold mb-4">{testimonial.name}</h2>
                  <p className="company text-sm text-white mb-4">{testimonial.company}</p>
                  <p className="mb-6">{testimonial.text}</p>
                  <a href={`mailto:${testimonial.email}`} className="contact-btn bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Contact
                  </a>
                </div>
              ))}
            </div>
          </Layout>
        </div>
      </section>
    </section>
  );
};

export default TestimonialCards;
