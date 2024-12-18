import React, {useContext, useEffect, useState} from 'react';
import {PageContent} from '../../components/page-content';
import {YellowHeder} from '../../components/yellow-heder';
import {FormHeader} from '../../components/formHeder';
import {NavigationButtons} from '../../components/navigationButtons';
import {CalculationContext, LayoutContext} from '../../context/layoutContext';
import {ContentGenerator} from '../../components/contentGenerator';
import {SummaryTable} from '../../components/summaryTable';
import {SummaryDocument} from '../../components/PDF';
import {ThankYouPage} from '../../graphql/queries/pl/thankYouPage';
import pl from '../../translations/pl.json';
import {ThankYouPageEn} from '../../graphql/queries/en/thankYouPage';
import en from '../../translations/en.json';

const nationalization = {
    pl: {
        translations: pl
    },
    eng: {
        translations: en
    }
};

export function Content({sections, classname, pdfData}) {
    const {currency, langState} = useContext(LayoutContext);
    const {state} = useContext(CalculationContext);
    const [loaded, setLoaded] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [document, setDocument] = useState(null);
    const customer = JSON.parse(sessionStorage.getItem('customer'));
    const {translations} = nationalization[langState];

    useEffect(() => {
        if (loaded && updated) {
            setDocument(
                <SummaryDocument customer={customer}
                                 pagesData={pdfData}
                                 state={state}
                                 currency={currency}
                                 translations={translations.pdf}
                                 clauses={translations.clauses}
                />
            );
        }
    }, [loaded, updated]);
    return (
        <div className="main">
            <FormHeader activeStep={6} currency={currency}/>
            <PageContent classname={classname}>
                <div className="content__container">
                    {sections.map(section => {
                        return (
                            <div key={section.id}>
                                <YellowHeder text={section.header}/>
                                <ContentGenerator section={section.header} loadSuccess={(e) => setLoaded(e)}
                                                  currentPage={5}/>
                            </div>
                        );
                    })}
                    <SummaryTable updated={(e) => setUpdated(e)}/>
                    <p className="content__clause"
                       dangerouslySetInnerHTML={{__html: translations.clauses.protectionClause}}/>
                    <p className="content__clause"
                       dangerouslySetInnerHTML={{__html: translations.clauses.informationClause}}/>
                    <NavigationButtons currentPage={5} pagesData={loaded && updated ? pdfData : null}/>
                </div>
            </PageContent>
        </div>
    );
}
