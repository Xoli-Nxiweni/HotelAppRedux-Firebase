import { useState } from 'react';
import './Contact.css';
import { FaCheckCircle } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear errors as user types
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulating successful submission
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000); // Reset success message after 3 seconds
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="contactUsContainer">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contactForm">
        <div className={`formGroup ${errors.name ? 'error-active' : ''}`}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className={`formGroup ${errors.email ? 'error-active' : ''}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className={`formGroup ${errors.message ? 'error-active' : ''}`}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
          ></textarea>
          {errors.message && <span className="error">{errors.message}</span>}
        </div>
        <button type="submit" className="submitButton">
          {submitted ? <FaCheckCircle /> : 'Send Message'}
        </button>
        {submitted && (
          <div className="successMessage">
            <FaCheckCircle /> Message sent successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactUs;
