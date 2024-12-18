import React from 'react';

export function MultimediaPanel({background, shader, classname, children}) {

    return (
        <div className={`${classname} multimedia`}
             style={{
                 backgroundImage: `url(${background}`
             }}
        >
            {shader &&
            <div className="multimedia__shader"/>
            }
            <div className="multimedia__content">
                {children}
            </div>
        </div>
    );
}
