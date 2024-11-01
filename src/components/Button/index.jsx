import './Button.css';

export default function Button({children, type, className }) {
    return (
        <button type={type} className={`btn-clasic ${className}`}>
            {children}
        </button>
    );
}