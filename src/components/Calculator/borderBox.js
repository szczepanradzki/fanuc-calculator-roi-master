import React from 'react';
import { Attribute } from './attribute';

export function BorderBox({content}) {
    return (
        <div className="borderBox">
            {content.attributesList.map(a => {
                return (
                    <Attribute key={a.id} content={a}/>
                );
            })}
        </div>
    );
}
