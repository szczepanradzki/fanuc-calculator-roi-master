import React, { useContext } from 'react';
import { PageContent } from '../../components/page-content';
import { YellowHeder } from '../../components/yellow-heder';
import { FormHeader } from '../../components/formHeder';
import { SwitchButton } from '../../components/switchButton';
import { NavigationButtons } from '../../components/navigationButtons';
import { LayoutContext } from '../../context/layoutContext';
import { ContentGenerator } from '../../components/contentGenerator';
import pl from '../../translations/pl.json';
import en from '../../translations/en.json';

const nationalization = {
    pl: {
        translations: pl
    },
    eng: {
        translations: en
    }
};

export function Content({sections}) {
    const {currency, setCurrency} = useContext(LayoutContext);
    const {langState} = useContext(LayoutContext);
    const {translations} = nationalization[langState];

    const setCurrencyHandler = (currency) => {
        localStorage.setItem('currency', currency);
        setCurrency(currency);
    };
    return (
        <div className="main">
            <FormHeader activeStep={2} currency={currency}/>
            <PageContent classname="step1">
                <div className="content__currency">
                    <h3>{translations.step1.currencyText}</h3>
                    <SwitchButton arr={['ZŁ', 'EUR']} startValue={currency} set={(e) => setCurrencyHandler(e)}/>
                </div>
                <div className="content__text">
                    <h3 className="content__header">
                        {translations.step1.setDetailsBelow}
                    </h3>
                    <p className="content__description">
                        {translations.step1.description}
                    </p>
                </div>
                <div className="content__container">
                    {sections.map(section => {
                        return (
                            <div key={section.id}>
                                <YellowHeder text={section.header}/>
                                <ContentGenerator section={section.header}/>
                            </div>
                        );
                    })}
                    <NavigationButtons currentPage={1}/>
                </div>
            </PageContent>
        </div>
    );
}
