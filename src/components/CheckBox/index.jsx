import React from 'react';
import './CheckBox.css';

export default function CheckBox({ label, checked, name, value, onChange }) {
    const inputId = `checkbox_${label}`; 

    return (
        <div className="checkbox-wrapper">
            <input
                type="checkbox"
                id={inputId}
                name={name}
                className="checkbox-input"
                checked={checked}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={inputId} className="checkbox">
                <span>
                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                </span>
                <span>{label}</span>
            </label>
        </div>
    );
}