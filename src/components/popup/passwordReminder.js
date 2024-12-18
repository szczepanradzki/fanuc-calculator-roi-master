import React, { useContext } from "react";
import { LayoutContext } from "../../context/layoutContext";
import { BaseButon } from "../baseButon";
import pl from "../../translations/pl.json";
import en from "../../translations/en.json";
import { useMutation } from "@apollo/client";
import { ForgotPassword } from "../../graphql/mutations/forgotPassword";

const nationalization = {
    pl: {
        translations: pl
    },
    eng: {
        translations: en
    }
};

export function PasswordReminderPopup({email, close}) {
    const {langState} = useContext(LayoutContext);
    const [forgottenPassword] = useMutation(ForgotPassword);
    const {translations} = nationalization[langState];
    const dialogText = {
        pl: `Jeżeli adres ${email} znajduje się w naszej bazie, zostanie na niego wysłany link do utworzenia nowego hasła.`,
        eng: `If ${email} exist in our database we'll send you link to set new one`
    };
    const dialogTroubleText = {
        pl: `Nie masz dostępu do tej skrzynki mailowej? <br/> Napisz do naszej obsługi technicznej na sales@fanuc.pl`,
        eng: `If you don't have access to this email? <br/> Send a request to our administrator at sales@fanuc.pl`
    };
    const sendRequest = async () => {
        await forgottenPassword({
            variables: {
                email: email
            }
        }).then(resp => {
            if(resp.data.forgotPassword.ok) {
                alert("Na podany adres został wysłany email");
                close();
            }
        }).catch(err => {
            let message = JSON.stringify(err);
            message = JSON.parse(message);
            alert(message.graphQLErrors[0].extensions.exception.data.message[0].messages[0].message);
        });

    };
    return (
        <div className="popup">
            <div className="popup__dialog">
                <i className="popup__dialog--close icon-close"
                   onClick={() => close()}
                />
                <p className="popup__dialog--text">
                    {dialogText[langState]}
                </p>
                <BaseButon type="button"
                           classname="btn btn__action popup__dialog--button"
                           text={translations.send}
                           onClick={() => sendRequest()}
                />
                <p className="popup__dialog--trouble" dangerouslySetInnerHTML={{__html: dialogTroubleText[langState]}}/>
            </div>
        </div>
    );

}
