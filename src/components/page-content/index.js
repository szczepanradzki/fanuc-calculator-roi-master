import React from "react";

export function PageContent({classname, children}) {
    return (
        <div className={`content ${classname}`}>
            {children}
        </div>
    );
}
