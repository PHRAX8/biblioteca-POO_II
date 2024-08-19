// src/components/BookEditForm.js
import React from 'react';
import FormInput from './FormInput';

const BookEditForm = ({ book, onSave, onCancel }) => {
  const [title, setTitle] = React.useState(book.title);
  const [author, setAuthor] = React.useState(book.author);
  const [isbn, setIsbn] = React.useState(book.isbn);
  const [available, setAvailable] = React.useState(book.available);

  const handleSave = () => {
    onSave({ title, author, isbn, available });
  };

  return (
    <div>
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
      <div className="form-group mb-3">
        <label className="form-label" style={{ color: '#495057' }}>Available:</label>
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
          className="form-check-input"
          style={{ marginTop: '7px' }}
        />
      </div>
      <button onClick={handleSave} className="btn btn-primary" style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}>Save</button>
      <button onClick={onCancel} className="btn btn-secondary ms-2">Cancel</button>
    </div>
  );
};

export default BookEditForm;
