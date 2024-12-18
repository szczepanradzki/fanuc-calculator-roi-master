import React, { useState } from 'react';

export function CheckBox({classname, name, defaultChecked, required, onchange, label, buttonFunc, buttonTxt, required_text}) {
    const [checked, setChecked] = useState(defaultChecked);

    const checkedHandler = (e) => {
        setChecked(e.target.checked);
        onchange(e);
    };
    return (
        <div className={`input checkbox ${classname ? 'checkbox__' + classname + '' : ''}`}>
            <input type="checkbox"
                   id={name}
                   className={`checkbox__input ${classname ? 'checkbox__input--' + classname : ''}`}
                   name={name}
                   checked={checked}
                   required={required}
                   onChange={(e) => checkedHandler(e)}
            />
            <label htmlFor={name}
                   className={`checkbox__label ${classname ? 'checkbox__label--' + classname : ''}`}
                   dangerouslySetInnerHTML={{__html: label}}
            />
            <span className={`error required ${classname}`}>{required_text}</span>
        </div>
    );
}

