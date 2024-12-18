import React, { useContext } from "react";
import { history } from "../../utils/history";
import { Icon } from "../icon";
import { Link } from "react-router-dom";
import pl from "../../translations/pl.json";
import en from "../../translations/en.json";
import { LayoutContext } from "../../context/layoutContext";

const logo = require("../../assets/images/FANUC-Logo.svg");

const nationalization = {
    pl: {
        translations: pl
    },
    eng: {
        translations: en
    }
};

export function Header({logout, user}) {
    const {langState} = useContext(LayoutContext);
    const {translations} = nationalization[langState];

    return (
        <header>
            <div className="header">
                <Link to={"/"}>
                    <img src={logo}
                         className="header__logo"
                         alt="logo fanuc"
                    />
                </Link>
                <div className="header__action-buttons">
                    {(user && user.user) ?
                        <button className="btn header__action-buttons--login" onClick={() => logout()}>
                            {user.user.username} <i className="icon icon-sign-out"/>
                        </button> :
                        <button className="btn header__action-buttons--login" onClick={() => history.push("/")}>
                            {translations.signin} <i className="icon icon-sign-in"/>
                        </button>
                    }
                    <Icon icon="icon-facebook-with-circle"
                          classname="header__action-buttons--social"
                          link={translations.facebookLink}
                          target="_blank"
                    />
                    <Icon icon="icon-linkedin-with-circle"
                          classname="header__action-buttons--social"
                          link={translations.linkedinLink}
                          target="_blank"
                    />
                    <Icon icon="icon-youtube-with-circle"
                          classname="header__action-buttons--social"
                          link={translations.youtubeLink}
                          target="_blank"
                    />
                </div>
            </div>
        </header>
    );
}
