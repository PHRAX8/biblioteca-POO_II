import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMember } from '../redux/memberSlice';
import FormInput from '../components/FormInput';

const MemberForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please fill in all required fields.');
      return;
    }
    dispatch(addMember({ name, email, phone }));

    // Resetting the form after submission
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-4" style={{ backgroundColor: '#f7f9fc', padding: '20px', borderRadius: '10px' }}>
      <h1 className="text-center" style={{ color: '#6c757d' }}>Add Member</h1>
      <form onSubmit={handleSubmit} className="w-50">
        <FormInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginBottom: '15px' }} // Adjust spacing here
        />
        <FormInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          style={{ marginBottom: '15px' }} // Adjust spacing here
        />
        <FormInput
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ marginBottom: '15px' }} // Adjust spacing here
        />
        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}>Add Member</button>
      </form>
    </div>
  );
};

export default MemberForm;
