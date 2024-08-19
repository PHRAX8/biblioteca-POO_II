// src/components/BookForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/bookSlice'; 
import FormInput from './FormInput';
import FormCheck from './FormCheck';

const BookForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [available, setAvailable] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBook({ title, author, isbn, available }));

        // Clear form fields after submission
        setTitle("");
        setAuthor("");
        setIsbn("");
        setAvailable(false);
    };

    return (
        <div className="container d-flex flex-column align-items-center mt-4" style={{ backgroundColor: '#f7f9fc', padding: '20px', borderRadius: '10px' }}>
            <h1 className="text-center" style={{ color: '#6c757d' }}>Add Book</h1>
            <form onSubmit={handleSubmit} className="w-50">
                <FormInput 
                    label="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <FormInput 
                    label="Author" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                />
                <FormInput 
                    label="ISBN" 
                    value={isbn} 
                    onChange={(e) => setIsbn(e.target.value)} 
                />
                <FormCheck 
                    checked={available} 
                    onChange={(e) => setAvailable(e.target.checked)} 
                    id="availableCheck" 
                    label="Available" 
                />
                <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}>Add Book</button>
            </form>
        </div>
    );
};

export default BookForm;
