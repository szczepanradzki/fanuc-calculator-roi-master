import {BaseButon} from "../baseButon";
import React, {useState} from "react";


const Popup = ({children, actions, close, isShow}) => {
    const actionsArray = Array.isArray(actions) ? actions : [actions];

    return <>
        {isShow &&
        <div className="popup">
            <div className="popup__dialog">
                <i className="popup__dialog--close icon-close"
                   onClick={close}
                />
                <p className="popup__dialog--text">
                    {children}
                </p>
                {actionsArray.map(button => {
                    return <BaseButon type="button"
                                      disabled={button.disabled}
                                      classname={button.className ?? "btn btn__action popup__dialog--button"}
                                      text={button.actionText}
                                      onClick={button.action}
                    />
                })}
            </div>
        </div>
        }

    </>
}
export const usePopup = ({initialSetIsShow} = {}) => {
    const [isShow, setIsShow] = useState(initialSetIsShow ?? false);

    const close = () => {
        setIsShow(false);
    }

    const open = () => {
        setIsShow(true);
    }

    const ExportPopup = ({children, actions}) => {
        return <Popup isShow={isShow} close={close} actions={actions}>{children}</Popup>;
    }

    return {Popup: ExportPopup, close, open, setIsShow};
}


export default Popup;