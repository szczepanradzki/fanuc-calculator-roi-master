import React, { useContext, useEffect, useState } from 'react';
import { ConfirmPage } from '../graphql/queries/pl/confirmationPage';
import { LayoutContext } from '../context/layoutContext';
import { useLocation } from 'react-router-dom';
import { client } from '../graphql/client';
import { GetUserDetails } from '../graphql/queries/getUser';
import {useMutation, useQuery} from '@apollo/client';
import { UpdateUser } from '../graphql/mutations/update';
import axios from 'axios';
import { ConfirmPageEn } from '../graphql/queries/en/confirmationPage';
import { registeredTemplate, textEmailConfirmation } from '../utils/registered-template';
import iconCheck from '../assets/images/fanuc_custom_icon_check.png';

const nationalization = {
    pl: {
        query: ConfirmPage,
        requested: 'confirmPage'
    },
    eng: {
        query: ConfirmPageEn,
        requested: 'confirmPageEn'
    }
};

export function ConfirmationPage() {
    const {langState} = useContext(LayoutContext);
    const [content, setContent] = useState(null);
    const {query, requested} = nationalization[langState];
    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('confirmation');

    useEffect(() => {
        getContent();
        sendConfirmationEmail();
    }, []);

    const getContent = async () => {
        const request = await client.query({
            query: query
        });
        const newObj = Object.keys(request.data[requested]).reduce((c, k) => (c[k.toLowerCase()] = request.data[requested][k], c), {});
        setContent(newObj);
    };
    const getId = async () => {
        const request = await axios.post(`${process.env.REACT_APP_CONTENT_URL}/auth/verify-token`, {token: token});

        return request.data.id;
    };

    const updateUser = async () => {
        const request = await client.query({
            query: GetUserDetails,
            variables: {
                id: await getId()
            }
        });
        return request.data.user.email;
    };

    const sendConfirmationEmail = async () => {
        await axios.post(`${process.env.REACT_APP_CONTENT_URL}/email`, {
            to: await updateUser(),
            from: 'Fanuc Polska < roi@fanucpolska.pl >',
            subject: 'Potwierdzenie aktywacji konta',
            html: registeredTemplate(),
            text: textEmailConfirmation(),
            attachments: [
                {
                    filename: 'fanuc_custom_icon_check.png',
                    path: iconCheck,
                    cid: 'icon-check'
                }
            ]
        });
    };

    return (
        content &&
        <main className="centered">
            <div className="confirmPage">
                <img className="confirmPage__image"
                     src={process.env.REACT_APP_CONTENT_URL + content.image.url}
                />
                <h1 className="confirmPage__title">
                    {content.title}
                </h1>
                <p className="confirmPage__description"
                   dangerouslySetInnerHTML={{__html: content.description}}
                />
            </div>
        </main>
    );
}
