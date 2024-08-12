import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMember } from '../redux/memberSlice';
import { useParams } from 'react-router-dom';

const MemberEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const member = useSelector((state) =>
    state.members.members.find((member) => member._id === id)
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (member) {
      setName(member.name);
      setEmail(member.email);
      setPhone(member.phone);
    }
  }, [member]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMember({ id, memberData: { name, email, phone } }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Member</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />
      <button type="submit">Update Member</button>
    </form>
  );
};

export default MemberEdit;
