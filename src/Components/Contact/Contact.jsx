import { useState } from 'react';
import './Contact.css';
import { TextField, Button, Snackbar, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, selectContacts } from '../../Features/slices/contactSlice';
import { FaUser, FaEnvelope, FaPhoneAlt, FaPen } from 'react-icons/fa';

const ContactUs = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    message: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the field's error on input
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.surname.trim()) {
      newErrors.surname = 'Surname is required';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[\d-+\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(addContact(formData)).unwrap();
        setSnackbarMessage('Message sent successfully!');
        setOpenSnackbar(true);
        setFormData({ name: '', surname: '', phone: '', message: '', email: '' });
      } catch (error) {
        setSnackbarMessage('Failed to send message');
        setOpenSnackbar(true);
        console.error('Error sending contact:', error);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="contactUs">
      <div className="contactUsLeft">
        <Typography variant="h4" className="contactTitle">Get in Touch</Typography>

        <Box className="formGroup">
          {/** Name Field */}
          <div className="inputFieldGroup">
            <label htmlFor="name" className="labelIcon">
              <FaUser className="inputIcon" /> Name
            </label>
            <TextField
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              variant="outlined"
              fullWidth
            />
          </div>

          {/** Surname Field */}
          <div className="inputFieldGroup">
            <label htmlFor="surname" className="labelIcon">
              <FaUser className="inputIcon" /> Surname
            </label>
            <TextField
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              error={!!errors.surname}
              helperText={errors.surname}
              variant="outlined"
              fullWidth
            />
          </div>

          {/** Email Field */}
          <div className="inputFieldGroup">
            <label htmlFor="email" className="labelIcon">
              <FaEnvelope className="inputIcon" /> Email
            </label>
            <TextField
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              fullWidth
            />
          </div>

          {/** Phone Field */}
          <div className="inputFieldGroup">
            <label htmlFor="phone" className="labelIcon">
              <FaPhoneAlt className="inputIcon" /> Phone
            </label>
            <TextField
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              variant="outlined"
              fullWidth
            />
          </div>

          {/** Message Field */}
          <div className="inputFieldGroup">
            <label htmlFor="message" className="labelIcon">
              <FaPen className="inputIcon" /> Message
            </label>
            <TextField
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          </div>

          <Button variant="contained" className="submitButton" onClick={handleSubmit}>
            Send Message
          </Button>
        </Box>
      </div>

      <div className="contactUsRight">
        {/* <img src="pic9.jpg" alt="Contact us" /> */}
        <img src="https://www.excelprint.co.za/wp-content/uploads/2022/12/Contact-Us-Vector-Illustration-Part-02-1-1600x1200-1.jpg" alt="Contact us" />
        <img src="https://www.excelprint.co.za/wp-content/uploads/2022/12/istockphoto-1271752802-170667a.jpg" alt="Contact us" />
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
};

export default ContactUs;
