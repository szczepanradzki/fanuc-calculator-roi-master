import React, { createRef, useContext, useState } from 'react';
import { Query } from '../graphql/query-component';
import { MultimediaPanel } from '../components/multimedia-panel';
import { SwitchButton } from '../components/switchButton';
import { PageContent } from '../components/page-content';
import { Input } from '../components/input';
import { BaseButon } from '../components/baseButon';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../context/layoutContext';
import { getHomepagePL } from '../graphql/queries/pl/homepage';
import { getHomepageEN } from '../graphql/queries/en/homepage_en';
import pl from '../translations/pl.json';
import en from '../translations/en.json';
import { validateForm } from '../utils/formValidation';
import { authenticationService } from '../utils/authService';
import { history } from '../utils/history';
import { PasswordReminderPopup } from '../components/popup/passwordReminder';
import ReactPlayer from 'react-player';

const nationalization = {
    pl: {
        query: getHomepagePL,
        requested: 'homepage',
        translations: pl
    },
    eng: {
        query: getHomepageEN,
        requested: 'homepageEn',
        translations: en
    }
};

export function HomePage() {
    const {langState, setLangState} = useContext(LayoutContext);
    const {query, requested, translations} = nationalization[langState];
    const [popupVisible, setPopupVisible] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });

    const emailRef = createRef();

    const handleInputChange = (e) => {
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value
        });
    };

    const langStateHandler = (lang) => {
        localStorage.setItem('lang', lang);
        setLangState(lang);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm(e)) {
            const login = await authenticationService.login(loginDetails.email, loginDetails.password);
            if(login) {
                history.push('/user-details');
            }
        }
    };

    const handlePasswordReset = () => {
        const emailInput = emailRef.current;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(loginDetails.email.match(emailRegex)) {
            emailInput.parentNode.querySelector('.error.invalid').style.display = 'none';
            emailInput.classList.remove('invalid');
            setPopupVisible(true);
        } else {
            emailInput.parentNode.querySelector('.error.invalid').style.display = 'block';
            emailInput.classList.add('invalid');
        }
    };

    return (
        <Query query={query}>
            {(response) => {
                return (
                    <main className="flex align__center">
                        <MultimediaPanel background={`${process.env.REACT_APP_CONTENT_URL}${response.data[requested].media_background.url}`}
                                         classname="homepage"
                                         shader
                        >
                            <h2 className="title" dangerouslySetInnerHTML={{__html: response.data[requested].media_title}}/>
                            <ReactPlayer className="video"
                                         url={response.data[requested].media_link}
                                         height={251}
                                         width={446}
                                         loop
                                         volume={1}
                                         muted
                                         controls
                                         config={{
                                             youtube: {
                                                 playerVars: {
                                                     fs: 0
                                                 }
                                             }
                                         }}
                            />
                            <div className="media-caption">
                                <p className="text">{response.data[requested].media_caption}</p>
                                <a className="btn btn__action"
                                   href={response.data[requested].redirect_link}
                                   target="_blank"
                                >{response.data[requested].media_button_text}</a>
                            </div>
                        </MultimediaPanel>
                        <div className="main">
                            <PageContent classname="homepage">
                                <SwitchButton arr={['pl', 'eng']} startValue={langState} set={(e) => langStateHandler(e)}/>
                                <h1 className="content__title">{response.data[requested].welcome_header}</h1>
                                <p className="content__text">
                                    {response.data[requested].welcome_text}
                                </p>
                                <p className="content__text content__text--submission">
                                    {response.data[requested].Login}
                                </p>
                                <form className="form" onSubmit={handleSubmit} noValidate>
                                    <Input type="email"
                                           reference={emailRef}
                                           classname="form__icon"
                                           icon="icon-user"
                                           placeholder={translations.login}
                                           name="email"
                                           invalid_text={translations.invalid}
                                           onChange={e => handleInputChange(e)}
                                           required
                                    />
                                    <Input type="password"
                                           classname="form__icon"
                                           icon="icon-lock"
                                           name="password"
                                           placeholder={translations.password}
                                           required_text={translations.required}
                                           onChange={e => handleInputChange(e)}
                                           required
                                    />
                                    <BaseButon text={translations.passwordReminder}
                                               onClick={() => handlePasswordReset()}
                                               type="button"
                                               classname="btn__transparent"
                                    />
                                    <BaseButon text={translations.signin}
                                               type="submit"
                                               classname="btn__action btn__action--submit"
                                    />
                                </form>
                                <p className="content__text content__text--submission">
                                    {response.data[requested].register_text} <Link to="/user-details"
                                                                                   className="link">{response.data[requested].register_link}</Link>
                                </p>
                            </PageContent>
                        </div>
                        {popupVisible &&
                        <PasswordReminderPopup email={loginDetails.email}
                                               close={() => setPopupVisible(false)}
                        />
                        }
                    </main>
                )
                    ;
            }}
        </Query>
    );
}
