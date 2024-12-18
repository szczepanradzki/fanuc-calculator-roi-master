import React, { useState, useEffect, useContext, useReducer } from 'react';
import { CalculationContext, DropdownContext, LayoutContext } from '../../context/layoutContext';
import { Icon } from '../icon';
import { NumericInput } from './numericInput';
import pl from '../../translations/pl.json';
import en from '../../translations/en.json';
import { customSavings } from '../../reducers/customSavings';
import {debug} from "../../utils/debug";

const nationalization = {
    pl: {
        translations: pl
    },
    eng: {
        translations: en
    }
};

export function AdditionalBox({content, setValue}) {
    const {langState} = useContext(LayoutContext);
    const {savedSavings, setSavedSavings} = useContext(CalculationContext);
    const [sum, setSum] = useState(1);
    const {translations} = nationalization[langState];
    const initialValue = (records) => {
        let initial = [];
        if(!records && !savedSavings) {
            return [];
        }
        if(savedSavings.length > 0) {
            return savedSavings;
        } else {
            records.map(child => {
                initial.push({header: child.header, default_value: child.default_value, unit: child.unit});
            });
            return initial;
        }
    };
    const [list, setlist] = useState(initialValue(content.default_records));

    useEffect(() => {
        setSavedSavings({type: 'SET_SAVINGS', content: list});
    }, []);

    useEffect(() => {
        sumUpdate();
    }, [list]);

    useEffect(() => {
        setValue(content.calculate_id, sum || 0);
    }, [sum]);

    const handleClick = (e) => {
        e.preventDefault();
        const newValues = {header: translations.extraSaving, default_value: 1000, unit: '#currency'};
        setSavedSavings({type: 'ADD_SAVINGS', content: [newValues]});
        setlist([...list, newValues]);
    };

    const sumUpdate = () => {
        let sum = 0;
        if(!list) {
            return 0;
        }
        Object.keys(list).map(key => {
            if(!isNaN(list[key].default_value)) {
                sum += list[key].default_value;
            }
        });
        setSum(sum.toFixed(1));
    };

    const handleChangeValue = (name, value, key) => {
        key -= 100;
        if(isNaN(key && list.length < key)) {
            return;
        }
        let newList = list;
        newList[key] = {header: name, default_value: value, unit: '#currency'};
        setlist(newList);
        sumUpdate();
    };

    const handleInputChange = (name, value, key) => {
        let newList = list;
        let object = {...newList[key]};
        object = {header: name, default_value: +value, unit: '#currency'};
        newList[key] = object;
        setlist([...newList]);
        setSavedSavings({type: 'SET_SAVINGS', content: [...newList]});
    };

    return (
        <div className="borderBox additionalBox">
            {debug ? content.calculate_id : ""}
            <div className="additionalBox__content">
                <DropdownContext.Provider value={{handleChangeValue, list}}>
                    {list.map((a, index) => {
                        return (
                            <div className="record" key={index}>
                                <div className="record__main">
                                    <div className={`record__main__text record__main--input`}>
                                        <input type="text"
                                               value={a.header}
                                               onChange={(e) => handleInputChange(e.target.value, a.default_value, index)}
                                        />
                                    </div>
                                    <NumericInput id={a.header}
                                                  valueState={a.default_value}
                                                  set={(e) => handleInputChange(a.header, e, index)}
                                                  showArrow={false}
                                                  unit={a.unit}
                                                  disabled={false}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </DropdownContext.Provider>
                <div onClick={handleClick} className="flex justify-start">
                    <Icon icon="icon-plus-circle"/>
                    <p>{translations.addItem}</p>
                </div>
            </div>
            <div className="additionalBox__summary">
                <hr className="borderBox--line"/>
                <div className={`attribute`}>
                    <div className={`attribute__text`}>
                        <p className="attribute__text__header" dangerouslySetInnerHTML={{__html: content.description}}/>
                    </div>
                    <NumericInput id={content.calculate_id}
                                  valueState={sum}
                                  set={setSum}
                                  unit={content.unit}
                                  disabled={true}
                    />
                </div>
            </div>
        </div>
    );
}
