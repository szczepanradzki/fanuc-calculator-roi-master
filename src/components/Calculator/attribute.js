import React, { useContext, useEffect, useState } from 'react';
import { NumericInput } from './numericInput';
import { calculations } from '../../utils/calculations';
import { CalculationContext, LayoutContext } from '../../context/layoutContext';
import ReactTooltip from 'react-tooltip';
import { markdownText } from '../../utils/mdRenderer';
import {debug} from "../../utils/debug";

export function Attribute({content}) {
    const {currency} = useContext(LayoutContext);

    const initDefaultValue = content.properities && Object.keys(content.properities).includes(currency.toLowerCase()) ?
        content.properities[currency.toLowerCase()].default_value :
        content.default_value ?? 0;
    const {state, dispatch} = useContext(CalculationContext);
    const [calculation, setCalculation] = useState(null);
    const [currentValue, setCurrentValue] = useState(initDefaultValue);
    const [contentUnit, setContentUnit] = useState(content.unit);
    const rounded = content.properities && Object.keys(content.properities).includes('round') ? content.properities.round : false;

    useEffect(() => {
        if(state[content.calculate_id] >= 0 && contentUnit === '%') {
            setCurrentValue(((state[content.calculate_id] * 100).toFixed(2) + '').replace(/\.?0+$/g, ''));
        } else if(state[content.calculate_id] >= 0) {
            setCurrentValue(state[content.calculate_id]);
        }
        if(content && contentUnit && contentUnit.match('#currency')) {
            setContentUnit(content.unit.replace(/#currency/g, currency));
        }
    }, []);

    useEffect(() => {
        if(typeof currentValue !== "undefined" && currentValue !== null) {
            if(contentUnit === '%') {
                dispatch({type: 'ADD_CALCULATION_CONTENT', content: {name: content.calculate_id, value: (currentValue / 100)}});
            } else {
                dispatch({type: 'ADD_CALCULATION_CONTENT', content: {name: content.calculate_id, value: currentValue}});
            }
        }
    }, [currentValue]);

    useEffect(() => {
        if(content.calculate_id && typeof calculation !== "undefined" && calculation !== null) {
            if(contentUnit === '%') {
                dispatch({type: 'ADD_CALCULATION_CONTENT', content: {name: content.calculate_id, value: (calculation / 100)}});
            } else {
                dispatch({type: 'ADD_CALCULATION_CONTENT', content: {name: content.calculate_id, value: calculation}});
            }
        }
    }, [calculation]);

    useEffect(() => {
        const isIndex = content.calculate_name ? content.calculate_name.replace(/index/, state.period) : content.calculate_name;
        setCalculation(calculations(isIndex, state));
    }, [content.calculate_name, state]);

    return (
        <div className={`attribute${content.calculate_name ? ' bg-gray' : ''} ${content.css_class ? content.css_class : ''}`}>
            <div className={`attribute__text ${content.css_class ? 'attribute__text--' + content.css_class : ''}`}>
                <p className="attribute__text__header">
                    <span>{content.header} {debug ? content.calculate_id : ""}</span>
                    {content.field_explaination ?
                        <p className="icon icon-info" data-tip={markdownText(content.field_explaination)}>
                            <ReactTooltip className="icon__tooltip"
                                          html
                            />
                        </p> :
                        <></>
                    }
                </p>
                <p className="attribute__text__description"> {content.description}</p>
            </div>
            <NumericInput valueState={calculation ? calculation : currentValue}
                          id={content.calculate_id}
                          set={setCurrentValue}
                          showArrow={content.show_arrows}
                          unit={contentUnit}
                          rounded={rounded}
                          classname={content.css_class}
                          disabled={content.calculate_name}
            />
        </div>
    );
}
