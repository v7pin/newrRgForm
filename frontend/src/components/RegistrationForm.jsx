import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: []
  });
  const [message, setMessage] = useState('');

  const interestsOptions = [
    'Website Designing',
    'French Learning',
    'German Learning',
    'Korean Learning',
    'Spanish Learning',
    'English Communication Classes'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const { interests } = formData;

    if (checked) {
      setFormData({
        ...formData,
        interests: [...interests, value]
      });
    } else {
      setFormData({
        ...formData,
        interests: interests.filter((interest) => interest !== value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', formData); // Debugging log
    try {
      const response = await axios.post('//admin.kshitiksha.xyz/registration', formData);
      setMessage(response.data.message);
      console.log('Response:', response.data); // Debugging log
    } catch (error) {
      console.error('Error:', error.response?.data?.error || 'Failed to submit registration'); // Debugging log
      setMessage(error.response?.data?.error || 'Failed to submit registration');
    }
  };

  return (
    <div className="registration-form">
      <h1>FUNLEARN REGISTRATION FORM</h1>
      <h2>KSHITIKSHA FOUNDATION 📚</h2>
      <p>"The journey of a thousand miles begins with one step. Embrace the adventure of learning with us at FUNLEARN by Kshitiksha Foundation."</p>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
        </div>
        <div>
          <label>E-Mail</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
        </div>
        <div>
          <label>Mobile Number</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your mobile number" required />
        </div>
        <div>
          <label>Interested in:</label>
          {interestsOptions.map((interest) => (
            <div key={interest}>
              <input
                type="checkbox"
                name="interests"
                value={interest}
                checked={formData.interests.includes(interest)}
                onChange={handleCheckboxChange}
              />
              <label>{interest}</label>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegistrationForm;
