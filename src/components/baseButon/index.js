import React from "react";

export function BaseButon({text = "", classname = "", onClick = null, isActive = false, type = "button", disabled = false}) {
    return (
        <button type={type}
                onClick={onClick}
                className={`btn ${classname} ${isActive ? "active" : ""}`}
                disabled={disabled}
        >
            {text}
        </button>

    );
}

export function DynamicBaseButon({content}) {
    return (
        <a href={content.link}
           target="_blank"
           className={`btn ${content.css_class}`}
        >
            {content.text}
        </a>

    );
}


