import './Input.css';
export default function Input({ label, type, value, onChange,  required}) {
    return (
        <div className="form-group">
            <input
                className="form-control"
                id={value}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder=' '
            />
            <label htmlFor={label} className='form-label'>{label}</label>
            
        </div>
    );
}