import React from 'react';
import ReactTooltip from 'react-tooltip';
import { markdownText } from '../../utils/mdRenderer';
import { numbersWithSpaces } from '../../utils/numbersSpacer';

export function TableRow({name, items, description, classname}) {
    return (
        <div className={`table__row ${classname ? `table__row--${classname}` : ''}`}>
            <div className={`table__item table__item--title`}>
                <span>{name}</span>
                {description ?
                    <p className={`icon icon-info`} data-tip={markdownText(description)}>
                        <ReactTooltip className="icon__tooltip"
                                      html
                        />
                    </p> :
                    <></>
                }
            </div>
            {items && items.map(element =>
                <div className={`table__item table__item--value`}>
                    {element === 0 ?
                        '0' :
                        numbersWithSpaces(element)
                    }
                </div>
            )}
        </div>
    );
}
