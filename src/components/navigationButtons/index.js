import React, {useContext, useEffect, useState} from 'react';
import {BaseButon} from '../baseButon';
import {history} from '../../utils/history';
import {PDFDownloadLink} from '@react-pdf/renderer';
import {CalculationContext, LayoutContext} from '../../context/layoutContext';
import pl from '../../translations/pl.json';
import en from '../../translations/en.json';
import {parseSavings, parseState, saveToFile} from '../../utils/uploadPdf';
import {Query} from "../../graphql/query-component";
import {GetStateContext} from "../../graphql/queries/getStateContext";
import {usePopup} from "../popup/popup";
import loader from "../../assets/images/loader.svg";
import {SummaryDocument} from "../PDF";
import {SaveState} from "../../graphql/mutations/saveState";
import {useMutation} from "@apollo/client";

const nationalization = {
    pl: {
        translations: pl
    },
    eng: {
        translations: en
    }
};

function downloadFile(filePath, fileName) {
    var link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;

    document.querySelector('body').append(link);
    link.click();
    link.remove();
}

const CalculationNamePopup = ({customer, stateContext, pagesData, Popup, close}) => {
    const filename = `Kalkulacja-ROI-${customer.username}-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [saveState] = useMutation(SaveState);
    const [url, setUrl] = useState();
    const [Link, setLink] = useState(null);
    const {currency, langState} = useContext(LayoutContext);
    const {state, savedSavings} = useContext(CalculationContext);
    const {translations} = nationalization[langState];

    const action = {
        actionText: <>
            {loading &&
            <img src={loader} width="24" height="12" alt={'loading'}/>
            }
            {translations.download}
        </>,
        action: async () => {
            setLoading(true);
        }
    }

    useEffect(() => {
        if (url) {
            (async () => {
                downloadFile(url, filename + '.pdf');
                setValue();
                const parsedState = parseState(state, stateContext);
                const parsedSavings = parseSavings(savedSavings);
                const response = await saveState({variables: {state: parsedState, savings: parsedSavings}});
                await saveToFile(url, value, response.data.createSavedState.savedState.id);

                setLoading(false);
                close();
            })();
        }
    }, [url]);

    const downloadLinkCallback = ({url}) => {
        setTimeout(() => {
            setUrl(url);
        }, 1000);
        return '';
    }


    useEffect(() => {
        const document = <SummaryDocument
            pagesData={pagesData}
            translations={translations.pdf}
            state={state}
            title={value}
            customer={customer}
            clauses={translations.clauses}
            currency={currency}
        />
        setLink(() => loading ? () => (<PDFDownloadLink document={document} fileName={`${filename}.pdf`}>
            {downloadLinkCallback}
        </PDFDownloadLink>) : () => <></>);
    }, [loading]);

    return <Popup actions={action}>
        {translations.downloadPopupHeader}
        <Link/>
        <input style={{marginTop: '15px'}} onChange={(e) => setValue(e.target.value)}/>
    </Popup>
}

const LastPageButton = ({pagesData}) => {
    const {Popup, open, close} = usePopup();
    const {langState} = useContext(LayoutContext);
    const {translations} = nationalization[langState];
    const customer = JSON.parse(sessionStorage.getItem('customer'));

    return <Query query={GetStateContext}>
        {(response) => {
            return <>
                <CalculationNamePopup
                    translations={translations}
                    customer={customer}
                    stateContext={response?.data?.stateContext[langState] ?? []}
                    pagesData={pagesData}
                    Popup={Popup}
                    close={close}
                />
                <button className="btn btn__action--next"
                        onClick={open}>
                    {translations.downloadPdf}
                </button>
            </>
        }}
    </Query>
}

export function NavigationButtons({currentPage, pagesData}) {
    const {dispatch} = useContext(CalculationContext);
    const {langState} = useContext(LayoutContext);
    const {translations} = nationalization[langState];

    const nextClick = () => {
        dispatch({type: 'ADD_HELPER_STATE', content: {name: 'availableStep', value: currentPage + 1}});
        history.push(`/calculator/${currentPage + 1}`);
    };
    const backClick = () => {
        if (currentPage === 1) {
            history.push(`/user-details`);
        } else {
            history.push(`/calculator/${currentPage - 1}`);
        }
    };

    return (
        <div className="navigationButtons">
            <BaseButon text={translations.backBtn} type="button" classname="btn__action--back" onClick={backClick}/>
            {currentPage === 5 ?
                <LastPageButton pagesData={pagesData} translations={translations}/> :
                <BaseButon text={translations.next} type="button" classname="btn__action--next" onClick={nextClick}/>
            }
        </div>
    );
}
