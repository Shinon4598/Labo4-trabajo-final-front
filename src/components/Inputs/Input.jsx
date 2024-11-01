export default function Input({ label, type, value, onChange, placeholder, required }) {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                className="form-control"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}