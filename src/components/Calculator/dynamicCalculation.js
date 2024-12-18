import React, { useContext } from 'react';
import { DropDownPanel } from './drop-down-panel';
import { Record } from './record';
import { SummaryComponent } from './summaryComponent';
import { CalculationContext, LayoutContext } from '../../context/layoutContext';
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

export function DynamicCalculation({content}) {
    const {langState, currency} = useContext(LayoutContext);
    const {state, dispatch} = useContext(CalculationContext);
    const {translations} = nationalization[langState];

    const setState = (id, value) => {
        if(id && typeof value !== "undefined" && value !== null) {
            dispatch({type: 'ADD_CALCULATION_CONTENT', content: {name: id, value: value}});
        }
    };

    return (
        <SummaryComponent description={content.calculator_subtitle}
                          subtext={content.calculator_description}
                          logic={content.logic_operation}
                          unit={content.unit}
                          id={content.calculate_id}
                          calcType={content.calculate_name}
                          calculate={setState}
        >
            {content.Records.map(r => {
                let currentValue = r.properities && Object.keys(r.properities).includes(currency.toLowerCase()) ?
                    r.properities[currency.toLowerCase()].default_value :
                    r.default_value ?? 0;

                if(state[r.calculate_id] !== 0) {
                    currentValue = state[r.calculate_id];
                }
                return (
                    <Record key={r.header}
                            text={r.header}
                            value={currentValue}
                            showArrow={r.show_arrows}
                            description={r.description}
                            ribon={r.ribbon}
                            unit={r.unit}
                            classname={r.css_class}
                            id={r.calculate_id}
                            calcType={r.calculate_name}
                    />
                );
            })}
            {(content.NewDropDown && content.NewDropDown.length > 0) &&
            <DropDownPanel header={translations.additionalPositions}
                           IsOpeen={false}
                           isSummary={content.calculator_subtitle !== null}
            >
                {content.NewDropDown.map(r => {
                    let currentValue = r.properities && Object.keys(r.properities).includes(currency.toLowerCase()) ?
                        r.properities[currency.toLowerCase()].default_value :
                        r.defalut_value;
                    if(state[r.calculate_id] >= 0) {
                        currentValue = state[r.calculate_id];
                    }
                    return (
                        <Record key={r.header}
                                text={r.header}
                                value={currentValue}
                                ribon={r.ribbon}
                                description={r.description}
                                classname={r.css_class}
                                id={r.calculate_id}
                                unit={r.unit}
                        />
                    );
                })}
            </DropDownPanel>
            }
        </SummaryComponent>
    );
}
