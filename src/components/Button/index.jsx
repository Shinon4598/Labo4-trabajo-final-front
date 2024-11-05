import './Button.css';
import { Link } from 'react-router-dom';

export default function Button({ children, type = 'button', className, to, ...rest}) {
    const Component = type === 'link' ? Link : 'button';
    const props = {
        className: `btn-clasic ${className}`,
        ...rest,
    };

    if (type === 'link') {
        props.to = to;
    } else {
        props.type = type;
    }
        
    return (
        <Component className={`btn-clasic ${className}`} {...props}>
            {children}
        </Component>
    );
}