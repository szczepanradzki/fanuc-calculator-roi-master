import React, { useEffect, useState } from 'react';
import { client } from '../../graphql/client';
import { markdownText } from '../../utils/mdRenderer';

export function ContentPopup({query, response, close}) {
    const [popupContent, setPopupContent] = useState(null);

    useEffect(() => {
        queryHandler();
    }, []);

    const queryHandler = async () => {
        const data = await client.query({
            query: query
        });
        setPopupContent(data.data[response]);
    };

    return (
        <div className="popup">
            <div className="popup__dialog popup__dialog--privacy">
                <i className="popup__dialog--close icon-close"
                   onClick={() => close()}
                />
                {popupContent &&
                <div className="popup__dialog--content">
                    <div className="header">
                        <h2 className="header__title">{popupContent.title}</h2>
                        <h3 className="header__subtitle">{popupContent.subtitle}</h3>
                        <div className="header__description" dangerouslySetInnerHTML={{__html: markdownText(popupContent.description)}}/>
                    </div>
                    <div className="body" dangerouslySetInnerHTML={{__html: markdownText(popupContent.content)}}/>
                </div>
                }
            </div>
        </div>
    );

}
