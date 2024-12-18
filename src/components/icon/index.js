import React from "react";

export function Icon({link, target, icon, classname, children = null, onclick}) {
    return (
        <div className={classname}>
            <a href={link} target={target}>
                <i className={`icon ${icon}`}/>
                {children}
            </a>
        </div>
    );
}
