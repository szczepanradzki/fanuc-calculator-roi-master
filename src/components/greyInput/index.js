import React, { useContext, useEffect, useState } from 'react';
import { NumericInput } from '../../components/Calculator/numericInput';
import { CalculationContext, LayoutContext } from '../../context/layoutContext';

export function DynamicGreyInput({content, setValue}) {
    const {currency} = useContext(LayoutContext);
    const {state} = useContext(CalculationContext);
    const initialValue = content.properities && Object.keys(content.properities).includes(currency.toLowerCase()) ?
        content.properities[currency.toLowerCase()].default_value :
        content.defalut_value;
    const [value, setValues] = useState(0);

    useEffect(() => {
        if(content.properities &&
            Object.keys(content.properities).includes(currency.toLowerCase())
        ) {
            setValues(content.properities[currency.toLowerCase()].default_value);
        } else {
            setValues(content.defalut_value);
        }
    }, [currency]);

    useEffect(() => {
        if(state[content.calculate_id]) {
            setValues(state[content.calculate_id]);
        } else {
            setValues(initialValue);
        }
    }, []);

    useEffect(() => {
        setValue(content.calculate_id, value);
    }, [value]);

    return (
        <div className="greyInput">
            <div className="greyInput__box">
                <NumericInput id={content.calculate_id}
                              valueState={value}
                              set={setValues}
                />
                <div className="greyInput__box__currency">
                    <p> {currency} </p>
                </div>
            </div>
            <p className="greyInput__description">
                {content.description}
            </p>
        </div>

    );
}
