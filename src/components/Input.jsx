import React from 'react';

const Input = ({label, type, name, value, onChange, required, autoComplete}) => {
  return (
    <div className=" flex flex-col mb-4 text-start">
        <label 
            htmlFor={name}
            className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"> 
            {label}
        </label>
        <input 
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" 
            type={type}
            name={name}
            value={value}
            required={required}
            onChange={onChange}
            title={label}
            autoComplete={autoComplete || "off"}
        />
    </div>
  );
}

export default Input;