import './RadioButton.css'

export default function RadioButton({ label, name, value, checked, onChange }) {
    const inputId = `${label}_${value}`;
    return (
        <div className="radio-input">
            <label class="label" htmlFor={inputId}>
                <input
                type="radio"
                id={inputId}
                checked={checked}
                name={name}
                value={value}
                onChange={onChange}
                />
                <p class="text">{label}</p>
            </label>
        </div>
    );
}