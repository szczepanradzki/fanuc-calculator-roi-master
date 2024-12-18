import React, { useContext, useEffect, useState } from 'react';
import { ThankYouPage } from '../graphql/queries/pl/thankYouPage';
import pl from '../translations/pl.json';
import en from '../translations/en.json';
import { LayoutContext } from '../context/layoutContext';
import { ThankYouPageEn } from '../graphql/queries/en/thankYouPage';
import { client } from '../graphql/client';

const nationalization = {
    pl: {
        query: ThankYouPage,
        requested: 'thankYouPage',
        translations: pl
    },
    eng: {
        query: ThankYouPageEn,
        requested: 'thankYouPageEn',
        translations: en
    }
};

export function RegisterThankYouPage() {
    const {langState} = useContext(LayoutContext);
    const {query, requested, translations} = nationalization[langState];
    const [content, setContent] = useState(null);
    let newObj = {};
    useEffect(() => {
        getContent();
    }, []);

    const getContent = async () => {
        const request = await client.query({
            query: query
        });
        newObj = Object.keys(request.data[requested]).reduce((c, k) => (c[k.toLowerCase()] = request.data[requested][k], c), {});
        setContent(newObj);
    };

    return (
        content &&
        <main className="centered">
            <div className="registerThanks">
                <img className="registerThanks__image"
                     src={process.env.REACT_APP_CONTENT_URL + content.image.url}
                />
                <h1 className="registerThanks__title">
                    {content.title}
                </h1>
                <p className="registerThanks__description"
                   dangerouslySetInnerHTML={{__html: content.description}}
                />
                <a className="btn btn__action btn__action--thanks"
                   href={translations.mainPage}
                >
                    {translations.seeUsBetter}
                </a>
            </div>
        </main>
    );
}
