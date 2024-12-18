import React, { useContext, useEffect } from 'react';
import { LayoutContext } from '../../context/layoutContext';

export function Select(
    {
        options,
        classname,
        icon,
        label,
        name,
        placeholder,
        value,
        onChange,
        disabled,
        required,
        required_text,
        invalid_text
    }) {
    const {setIndustry} = useContext(LayoutContext);

    useEffect(() => {
        if(value) {
            setIndustry(value);
        }
    }, [value]);

    return (
        <div className={`input ${classname}`}>
            {label &&
            <label className={disabled ? 'disabled' : ''} htmlFor={name}>{label}</label>
            }
            {icon &&
            <div className="icon-wrap">
                <i className={`icon ${icon}`}/>
            </div>
            }
            <select id={name}
                    className={classname}
                    name={name}
                    required={required}
                    disabled={disabled}
                    onChange={onChange}
                    value={value}
                    defaultValue=""
            >
                <option value="" disabled>{placeholder}</option>
                {options.length > 0 &&
                options.map(option =>
                    <option key={option.id}
                            value={option.value}
                    >
                        {option.name}
                    </option>
                )
                }
            </select>
            <span className="error required">{required_text}</span>
            <span className="error invalid">{invalid_text}</span>
        </div>
    );
}
