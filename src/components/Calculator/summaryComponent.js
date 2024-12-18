import React, { useState, useEffect, useContext } from 'react';
import { CalculationContext, DropdownContext } from '../../context/layoutContext';
import { NumericInput } from './numericInput';
import { calculations } from '../../utils/calculations';
import {debug} from "../../utils/debug";

function additionChildrenValue(values) {
    let sum = 0;
    if(!values) {
        return 0;
    }
    Object.keys(values).map(key => {
        if(!isNaN(values[key])) {
            sum += values[key];
        }
    });
    return sum.toFixed(2);
}

function subtractionChildrenValue(values) {
    let list = Object.values(values);
    if(list.length < 1) {
        return 0;
    }
    let result = list[0];
    for(let i = 1; i < list.length; i++) {
        result -= list[i];
    }
    return result.toFixed(2);
}

function multiplicationChildrenValue(values) {
    let result = 1;
    Object.values(values).map(value => {
        if(value === 0) {
            result = 0;
        } else {
            result *= value;
        }
    });
    return result;

}

let initial = {};
const initialValue = (children, state) => {
    const keys = Object.keys(state);
    children.map(child => {
        if(child && child.props && child.props.value >= 0) {
            if(keys.includes(child.props.id)) {
                initial[child.props.text] = state[child.props.id];
            } else {
                initial[child.props.text] = Number(child.props.value);
            }
        }
        if(child && child.props && child.props.children) {
            initialValue(child.props.children, state);
        }
        if(child.length > 0) {
            initialValue(child, state);
        }
    });
    return initial;
};

export function SummaryComponent({id, description, subtext, children, classname = '', logic, unit, calcType, calculate}) {
    initial = {};
    const {state} = useContext(CalculationContext);
    const intialValues = initialValue(children, state);
    const [values, setValues] = useState(intialValues);
    const [calculation, setCalculation] = useState(null);

    useEffect(() => {
        calculate(id, doMath());
    }, [values]);

    useEffect(() => {
        if(!logic) {
            calculate(id, calculation);
        }
    }, [calculation]);

    useEffect(() => {
        setCalculation(calculations(calcType, state));
    }, [state]);

    const handleChangeValue = (name, value) => {
        if(value >= 0) {
            setValues({
                ...values,
                [name]: value
            });
        } else {
            return;
        }
    };

    const doMath = () => {
        if(logic === 'addition') {
            return +additionChildrenValue(values);
        }
        if(logic === 'subtraction') {
            return +subtractionChildrenValue(values);
        }
        if(logic === 'multiplication') {
            return +multiplicationChildrenValue(values);
        } else {
            return 0;
        }
    };

    return (
        <div className="summaryComponent">
            <DropdownContext.Provider value={{handleChangeValue, values}}>
                {children}
            </DropdownContext.Provider>
            {description &&
            <div className="borderBox">
                <div className={`attribute bg-gray ${classname}`}>
                    <div className={`attribute__text ${classname ? 'attribute__text--' + classname : ''}`}>
                        <p className="attribute__text__header">{description}</p>
                        {debug ? <p>{id}</p> : ""}
                        <p className="attribute__text__description"> {subtext}</p>
                    </div>
                    <NumericInput valueState={calculation ? calculation : doMath()}
                                  id={id}
                                  set={setValues}
                                  unit={unit}
                                  classname={classname}
                                  disabled={true}
                    />
                </div>
            </div>
            }
        </div>
    );
}
