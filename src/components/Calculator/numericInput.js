import React, { useContext, useEffect } from 'react';
import { LayoutContext } from '../../context/layoutContext';
import { Icon } from '../icon';
import { numbersWithSpaces } from '../../utils/numbersSpacer';

function ArrowIcon({icon, isVisible, onClick = null, direction}) {
    if(!isVisible) {
        return null;
    }
    return (
        <div className={`arrow-icon arrow-icon__${direction}`}
             onClick={onClick}>
            <Icon icon={icon}
                  classname=""
                  target="_blank"
            />
        </div>
    );
}

export function NumericInput({valueState, set, showArrow = false, unit, classname, id, disabled = false, rounded}) {
    const {currency} = useContext(LayoutContext);
    const maxValue = 900000000;
    const value = rounded ? Math.round(valueState) : valueState;
    if(unit && unit === '#currency') {
        unit = currency;
    }

    const validateInputChange = (value) => {
        if(value.length >= 1 && value[0] === '0') {
            if(value.indexOf('.') === -1) {
                const positiveValue = Number(value);
                set(positiveValue + '');
                return;
            } else {
                set(value);
                return;
            }
        }
        if(+value >= 0 && +value <= maxValue) {
            set(value);
            return;
        }
        if(+value < 0) {
            set(0);
            return;
        }
        if(+value >= maxValue) {
            set(maxValue + '');
            return;
        }
    };
    const handleKeyPress = (e) => {
        if(!e.key.match(/[0-9,.]/g)) {
            e.preventDefault();
        }
    };

    const arrowDownHandler = () => {
        const stringValue = value + '';
        if(stringValue.length >= 1 && stringValue[0] === '0') {
            set(0);
            return;
        }
        if(value > 0) {
            set((+value - 1).toFixed(2).replace(/\.?0+$/g, '') + '');
            return;
        }
    };

    return (
        <div className={`numericInput ${showArrow ? 'numericInput__extendedPadding' : 'numericInput__normalPadding'}`}>
            <ArrowIcon isVisible={showArrow}
                       icon="icon-chevron-down"
                       onClick={() => arrowDownHandler()}
                       direction="down"
            />
            {disabled || !id ?
                <p className={`numericInput__score ${classname ? 'numericInput--' + classname : ''}`}>{numbersWithSpaces(value)}</p> :
                <input id={id}
                       className={
                           `numericInput--input ${classname ? 'numericInput--' + classname : ''}`
                       }
                       type="number"
                       value={value}
                       onClick={(e) => e.stopPropagation()} // consume event click here
                       onChange={(e) => validateInputChange(e.target.value)}
                       onKeyPress={(e) => handleKeyPress(e)}
                       disabled={disabled || !id}
                />
            }
            {unit &&
            <p className={`numericInput--unit ${classname ? 'numericInput--' + classname : ''}`}>
                {unit}
            </p>
            }
            <ArrowIcon isVisible={showArrow}
                       icon="icon-chevron-up"
                       onClick={() => value >= 0 && set((((+value + 1).toFixed(2)) + '').replace(/\.?0+$/g, ''))}
                       direction="up"
            />
        </div>
    );
}
