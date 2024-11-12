import React from 'react';

const Input = ({ label, type, name, value, onChange, required, autoComplete }) => (
    <div className="input-field">
        <label htmlFor={name}>{label}</label>
        <input 
            type={type} 
            name={name} 
            value={value} 
            onChange={onChange} 
            required={required} 
            autoComplete={autoComplete || "off"}  
        />
    </div>
);

export default Input;
