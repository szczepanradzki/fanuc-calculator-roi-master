import React from "react";

export function Input(
    {
        type,
        classname,
        placeholder,
        icon,
        label,
        name,
        value,
        reference,
        onChange,
        disabled,
        required,
        required_text,
        invalid_text
    }) {
    return (
        <div className={`input ${classname}`}>
            {label &&
            <label className={disabled ? "disabled" : ""} htmlFor={name}>{label}</label>
            }
            {icon &&
            <div className="icon-wrap">
                <i className={`icon ${icon}`}/>
            </div>
            }
            <input id={name}
                   type={type}
                   ref={reference}
                   placeholder={placeholder}
                   name={name}
                   defaultValue={value}
                   onInput={onChange}
                   disabled={disabled}
                   required={required}
            />
            <span className="error required">{required_text}</span>
            <span className="error invalid">{invalid_text}</span>
        </div>
    );
}
