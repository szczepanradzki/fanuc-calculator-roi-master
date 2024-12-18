import React from "react";


export function TitleCalculator({ header = "", description = "", classname = "" }) {
    return (
        <div className={`TitleCalculator ${classname}`}>
            <h3 className="TitleCalculator__heder">{header}</h3>
            <p className="TitleCalculator__description"> {description}</p>
        </div>

    );
}
