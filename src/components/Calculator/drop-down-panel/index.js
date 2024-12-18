import React, { useEffect, useState, useContext } from 'react';
import { Icon } from '../../icon';
import { DropdownContext } from '../../../context/layoutContext';

function DropDownIcon({isOpen}) {
    return (
        <Icon icon={isOpen ? ' icon-chevron-up' : 'icon-chevron-down'}
              classname=""
              target="_blank"
        />
    );
}

function sumChildrenValue(values, children) {
    let sum = 0;
    if(!values) {
        return 0;
    }
    Object.keys(values).map(key => {
        children.forEach(item => {
            if(item.props.text === key) {
                sum += values[key];
            }
        });

    });
    return sum.toFixed(2);
}

export function DropDownPanel({header, children, IsOpeen = false, isSummary = true}) {
    const [isOpen, setIsOpen] = useState(IsOpeen);
    const {values} = useContext(DropdownContext);

    let sum = sumChildrenValue(values, children);

    useEffect(() => {
        sum = sumChildrenValue(values, children);
    }, [values]);

    return (
        <div className="dropDownPanel" onClick={() => setIsOpen(!isOpen)}>
            <div className="dropDownPanel__heder">
                <div className="flex">
                    <p>{header}</p>
                    <DropDownIcon isOpen={isOpen}/>
                </div>
                {isSummary && <p>{sum.replace(/\./g, ',').replace(/\.?0+$/g, '')}</p>}
            </div>
            <div className={isOpen ? 'dropDownPanel__content dropDownPanel__content--open' : 'dropDownPanel__content'}>
                {children}
            </div>
        </div>
    );
}
