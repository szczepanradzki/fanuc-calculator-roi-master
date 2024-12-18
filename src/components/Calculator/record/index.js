import React, { useState, useContext, useEffect } from 'react';
import { CalculationContext, DropdownContext, LayoutContext } from '../../../context/layoutContext';
import { NumericInput } from '../numericInput';
import { calculations } from '../../../utils/calculations';
import {debug} from "../../../utils/debug";

export function Record({text, value = 0, showArrow = false, unit, ribon, description, classname, index, calcType, id}) {
    const {handleChangeValue} = useContext(DropdownContext);
    const {state, dispatch} = useContext(CalculationContext);
    const {currency} = useContext(LayoutContext);
    const [valueState, setValueState] = useState(value);
    const [calculation, setCalculation] = useState(null);
    const [ribbon, setRibbon] = useState(ribon);
    const [descriptConverted, setDescriptConverted] = useState(description);

    useEffect(() => {
        if(state[id]) {
            setValueState(state[id]);
        } else {
            setValueState(value);
        }
        if(ribon) {
            setRibbon(ribon.replace(/\{\#currency\}/g, currency.toLowerCase()));
        }
        if(description) {
            setDescriptConverted(description.replace(/\{\#currency\}/g, currency.toLowerCase()));
        }
    }, []);

    useEffect(() => {
        if(id) {
            dispatch({type: 'ADD_CALCULATION_CONTENT', content: {name: id, value: +valueState}});
        }
    }, [valueState]);

    useEffect(() => {
        if(id && calculation) {
            dispatch({type: 'ADD_CALCULATION_CONTENT', content: {name: id, value: calculation}});
        }
    }, [calculation]);

    useEffect(() => {
        handleChangeValue(text, Number(valueState), index);
    }, [valueState, text]);

    useEffect(() => {
        setCalculation(calculations(calcType, state));
    }, [calcType, state]);

    return (
        <div className={`record ${calcType ? 'bg-gray' : ''}`}>
            <div className="record__main">
                <div className={`record__main__text ${classname ? 'record__main--' + classname : ''}`}>
                    {
                        classname === 'input' ?
                            <input type="text"
                                   defaultValue={text}
                            /> :
                            <p>{text}</p>
                    }
                    {debug ? <p>{id}</p> : ""}
                    <p className="record__main__text--description">{ribbon}</p>
                </div>
                <NumericInput id={id}
                              valueState={calculation ? calculation : valueState}
                              set={setValueState}
                              showArrow={showArrow}
                              unit={unit}
                              classname={classname}
                              disabled={calcType}
                />
            </div>
            <div className={`record__description`}>
                <p>{descriptConverted}</p>
            </div>
        </div>
    );
}
