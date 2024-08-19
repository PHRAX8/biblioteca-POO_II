import React from 'react';

const FormCheck = ({ checked, onChange, id, label }) => (
    <div className="form-group form-check">
        <input 
            type="checkbox" 
            className="form-check-input" 
            checked={checked} 
            onChange={onChange} 
            id={id}
        />
        <label className="form-check-label" htmlFor={id} style={{ color: '#495057' }}>{label}</label>
    </div>
);

export default FormCheck;
