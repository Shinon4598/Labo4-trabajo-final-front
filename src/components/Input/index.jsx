import './Input.css';
export default function Input({ label, type, name = '', value, onChange,  required}) {
    const inputId = `${label}_${type}`; 
    return (
        <div className="form-group">
            <input
                className="form-control"
                id={inputId}
                type={type}
                name={name === '' ? label : name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder=' '
            />
            <label htmlFor={label} className='form-label'>{label}</label>
            
        </div>
    );
}