import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { MultimediaPanel } from "../components/multimedia-panel";
import { PageContent } from "../components/page-content";
import { getHomepagePL } from "../graphql/queries/pl/homepage";
import pl from "../translations/pl.json";
import { getHomepageEN } from "../graphql/queries/en/homepage_en";
import en from "../translations/en.json";
import { Query } from "../graphql/query-component";
import { Input } from "../components/input";
import { BaseButon } from "../components/baseButon";
import { LayoutContext } from "../context/layoutContext";
import { ResetPassword } from "../graphql/mutations/resetPassword";
import { useMutation } from "@apollo/client";
import { history } from "../utils/history";

const nationalization = {
    pl: {
        query: getHomepagePL,
        requested: "homepage",
        translations: pl
    },
    eng: {
        query: getHomepageEN,
        requested: "homepageEn",
        translations: en
    }
};

export function PasswordReset() {
    const {langState} = useContext(LayoutContext);
    const {query, requested, translations} = nationalization[langState];
    const {search} = useLocation();
    const code = new URLSearchParams(search);
    const [resetPassword] = useMutation(ResetPassword);
    const [password, setPassword] = useState({
        password: "",
        reType: ""
    });

    const handleInputChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password.password === "") {
            const input = document.querySelector("#password");
            input.parentNode.querySelector(".error.required").style.display = "block";
            input.classList.add("invalid");
        }
        if(password.reType === "") {
            const input = document.querySelector("#reType");
            input.parentNode.querySelector(".error.required").style.display = "block";
            input.classList.add("invalid");
        }
        if(password.password !== password.reType) {
            const inputs = document.querySelectorAll("input[type='password']");
            [...inputs].map(input => {
                input.parentNode.querySelector(".error.required").style.display = "none";
                input.parentNode.querySelector(".error.invalid").style.display = "block";
                input.classList.add("invalid");
            });

        }
        if(password.password === password.reType && password.password !== "" && password.reType !== "") {
            const inputs = document.querySelectorAll("input[type='password']");
            [...inputs].map(input => {
                input.parentNode.querySelector(".error.required").style.display = "none";
                input.parentNode.querySelector(".error.invalid").style.display = "none";
                input.classList.remove("invalid");
            });
            const request = await resetPassword({
                variables: {
                    password: password.password,
                    reType: password.reType,
                    code: code.get("code")
                }
            });
            if(request) {
                history.push("/");
            }
        }
    };

    return (
        <Query query={query}>
            {(response) => {
                return (
                    <main className="flex flex-end">
                        <MultimediaPanel background={`${process.env.REACT_APP_CONTENT_URL}${response.data[requested].media_background.url}`}
                                         classname="homepage"
                                         shader
                        >
                            <h2 className="title" dangerouslySetInnerHTML={{__html: response.data[requested].media_title}}/>
                            <iframe className="video"
                                    title="fanuc industrial robots"
                                    width="446"
                                    height="251"
                                    src="https://www.youtube-nocookie.com/embed/rbki4HR41-4"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                            />
                            <div className="media-caption">
                                <p className="text">{response.data[requested].media_caption}</p>
                                <button className="btn btn__action">{response.data[requested].media_button_text}</button>
                            </div>
                        </MultimediaPanel>
                        <PageContent classname="password-reset">
                            <h1 className="content__title">{translations.resetPassword.title}</h1>
                            <p className="content__text">
                                {translations.resetPassword.subtitle}
                            </p>
                            <form className="form" onSubmit={handleSubmit} noValidate>
                                <Input type="password"
                                       classname="form__icon"
                                       icon="icon-lock"
                                       placeholder={translations.resetPassword.newPassword}
                                       name="password"
                                       invalid_text={translations.resetPassword.invalid}
                                       required_text={translations.required}
                                       onChange={e => handleInputChange(e)}
                                       required
                                />
                                <Input type="password"
                                       classname="form__icon"
                                       icon="icon-lock"
                                       name="reType"
                                       placeholder={translations.resetPassword.reEnter}
                                       invalid_text={translations.resetPassword.invalid}
                                       required_text={translations.required}
                                       onChange={e => handleInputChange(e)}
                                       required
                                />
                                <BaseButon text={translations.resetPassword.submit}
                                           type="submit"
                                           classname="btn__action"
                                />
                            </form>
                        </PageContent>
                    </main>
                );
            }}
        </Query>
    );
}
