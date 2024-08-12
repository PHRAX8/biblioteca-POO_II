import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMember } from '../redux/memberSlice';

const MemberForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMember({ name, email, phone }));
  };

  return (
    <div>
      <h1>Add Member</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default MemberForm;
