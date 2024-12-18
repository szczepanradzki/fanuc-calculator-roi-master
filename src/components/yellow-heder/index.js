import React from 'react';

export function YellowHeder({text, className = ''}) {
    return (
        <div className={`yellowHeder ${className}`}>
            <h2 dangerouslySetInnerHTML={{__html: text}}/>
        </div>
    );
}
