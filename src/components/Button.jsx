import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, title, type = 'button', to}) => {
    const Component = type === 'link' ? Link : 'button';

    const props = {
        className: 'w-full px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out',
        title: title,
    };
  
    if (type === 'link') {
        props.to = to;
    } else {
        props.type = type;
    }

    return (
        <Component {...props}>
            {children}
        </Component>
    );
}

export default Button;
