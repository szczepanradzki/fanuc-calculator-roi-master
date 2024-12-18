import React, { useContext, useEffect, useState } from 'react';
import { TitleCalculator } from './titleCalculator';
import { calculations } from '../../utils/calculations';
import { CalculationContext } from '../../context/layoutContext';
import { numbersWithSpaces } from '../../utils/numbersSpacer';
import {debug} from "../../utils/debug";

export function Outcome({content}) {
    const {state, dispatch} = useContext(CalculationContext);
    const [contentDetails, setContentDetails] = useState(null);

    useEffect(() => {
        const arr = [];
        content.mainResult.map(item => {
            arr.push({
                id: item.calculate_id,
                header: item.header,
                description: item.description,
                css_class: item.css_class,
                value: calculations(item.calculate_name, state),
                unit: item.unit
            });
        });
        setContentDetails(arr);
    }, [state['SP#0']]);

    useEffect(() => {
        if(contentDetails && contentDetails.length > 0) {
            contentDetails.map(t => {
                dispatch({type: 'ADD_CALCULATION_CONTENT', content: {name: t.id, value: t.value}});
            });
        }
    }, [contentDetails]);

    return (
        <div className={`outcome `}>{debug ? content.calculate_id : ""}
            <hr/>
            {contentDetails && contentDetails.map(t => {
                return (
                    <div className="outcome__content">
                        <TitleCalculator header={t.header} description={t.description}/>
                        <div className={
                            `outcome__content__numeric ${t.css_class ? 'outcome__content__numeric--' + t.css_class : ''}`
                        }>
                            <p className={`numericInput__score`}>{numbersWithSpaces(t.value)}</p>
                            <p> {t.unit}</p>
                        </div>
                    </div>
                );
            })}
            <hr/>
        </div>

    );
}
