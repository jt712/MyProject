import React, { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
  // फॉर्म शो/हाईड करण्यासाठी स्टेट
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    interest: "AI/ML & GenAI",
    timeline: "1 month",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xrevdnra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          interest: formData.interest,
          timeline: formData.timeline,
          message: formData.message,
        }),
      });

      if (response.ok) {
        alert("Message Sent Successfully!");

        setFormData({
          name: "",
          mobile: "",
          email: "",
          interest: "AI/ML & GenAI",
          timeline: "1 month",
          message: "",
        });

        // सबमिट झाल्यावर फॉर्म परत ऑटोमॅटिक हायड करण्यासाठी
        setIsFormVisible(false);
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-card">
        {/* नेहमी दिसणाऱ्या २ लाईन्स */}
        <h2>Let's build something great.</h2>
        <p>Tell us about your initiative and the outcomes you need.</p>

        {/* जर फॉर्म लपवलेला असेल तर बटण दिसेल */}
        {!isFormVisible && (
          <button 
            className="toggle-form-btn" 
            onClick={() => setIsFormVisible(true)}
          >
            Get In Touch / Open Form
          </button>
        )}

        {/* क्लिक केल्यानंतर फॉर्म आणि इतर सर्व डिटेल्स उघडतील */}
        {isFormVisible && (
          <div className="form-container">
            <p className="response-time">
              Avg response: 1 business day · Phone: +91 75060 64193
            </p>

            <form onSubmit={sendEmail}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>Mobile</label>
              <input
                type="tel"
                name="mobile"
                placeholder="+91 9876543210"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label>Area Of Interest</label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
              >
                <option>AI/ML & GenAI</option>
                <option>Training & Consulting</option>
                <option>Software Services</option>
              </select>

              <label>Desired Timeline</label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
              >
                <option>1 month</option>
                <option>3 months</option>
                <option>6 months</option>
                <option>1 year</option>
              </select>

              <label>What should we know?</label>
              <textarea
                rows="4"
                name="message"
                placeholder="Goals, timeline, success metrics"
                value={formData.message}
                onChange={handleChange}
              />

              <div className="btn-group">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setIsFormVisible(false)}
                >
                  Close Form
                </button>
              </div>
            </form>

            <div className="contact-footer">
              <p>Prefer email? helpme@dnyanai.co.in</p>
              <p>Prefer a call? +91 75060 64193</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}