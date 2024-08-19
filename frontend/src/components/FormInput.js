import React from 'react';

const FormInput = ({ label, value, onChange, type = "text", required = true, style }) => (
    <div className="form-group">
        <label className="form-label" style={{ color: '#495057' }}>{label}:</label>
        <input 
            type={type}
            className="form-control"
            value={value}
            onChange={onChange}
            required={required}
            style={{ borderColor: '#ced4da', borderRadius: '5px', ...style }}
        />
    </div>
);

export default FormInput;
