// src/components/FormSelect.js
import React from 'react';

const FormSelect = ({ label, value, onChange, options, required = true, style }) => (
    <div className="form-group">
        <label className="form-label" style={{ color: '#495057' }}>{label}:</label>
        <select 
            className="form-select"
            value={value}
            onChange={onChange}
            required={required}
            style={{ borderColor: '#ced4da', borderRadius: '5px', ...style }}
        >
            <option value="" disabled>Select an option</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default FormSelect;
