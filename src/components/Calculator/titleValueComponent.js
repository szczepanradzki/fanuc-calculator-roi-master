import React, { useState, useEffect, useContext } from 'react';
import { NumericInput } from './numericInput';
import { TitleCalculator } from './titleCalculator';
import { CalculationContext } from '../../context/layoutContext';

export function DynamicTitleValueComponent({content, setValue}) {
    const [valueState, setValueState] = useState(content.default_value);
    const {state} = useContext(CalculationContext);
    useEffect(() => {
        if(state[content.calculate_id]) {
            setValueState(state[content.calculate_id]);
        } else {
            setValueState(content.default_value);
        }
    }, []);

    useEffect(() => {
        setValue(content.calculate_id, valueState || 0, content.header);
    }, [valueState]);

    return (
        <div className={`TitleValueCalculator ${content.classname ? content.classname : ''}`}>
            <TitleCalculator header={content.header}
                             description={content.description}
            />
            <NumericInput id={content.calculate_id}
                          valueState={valueState}
                          set={setValueState}
                          showArrow={content.showArrow}
            />
        </div>
    );
}
