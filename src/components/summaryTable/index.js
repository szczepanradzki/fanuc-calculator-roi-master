import React, { useContext, useEffect, useState } from 'react';
import { GetSummaryTable } from '../../graphql/queries/pl/summaryTable';
import { client } from '../../graphql/client';
import { TableRow } from './row';
import { CalculationContext, LayoutContext } from '../../context/layoutContext';
import { calculations } from '../../utils/calculations';
import { GetSummaryTableEN } from '../../graphql/queries/en/summaryTable';
import pl from "../../translations/pl.json"
import en from "../../translations/en.json"

const nationalization = {
    pl: {
        query: GetSummaryTable,
        requested: 'summaryTable',
        translations: pl
    },
    eng: {
        query: GetSummaryTableEN,
        requested: 'summaryTableEn',
        translations: en
    }
};

export function SummaryTable({updated = false}) {
    const {langState} = useContext(LayoutContext);
    const {state, dispatch} = useContext(CalculationContext);
    const [data, setData] = useState(null);
    const [period, setPeriod] = useState([]);
    const [tableContent, setTableContent] = useState(null);
    const {query, requested, translations} = nationalization[langState];

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        handlePeriod();
    }, [data]);

    useEffect(() => {
        if(data && period) {
            handleCalculations();
        }
    }, [period, state['E119'], state['E111']]);

    useEffect(() => {
        if(tableContent) {
            const checkerArray = tableContent.map(item => {
                return !item.items.includes(NaN);
            });
                dispatch({type: 'ADD_HELPER_STATE', content: {name: 'table', value: tableContent}});
                updated(true);
        }
    }, [tableContent]);

    const getData = async () => {
        const request = await client.query({
            query: query
        });
        const response = await request.data[requested];
        setData(response);
        dispatch({type: 'ADD_CALCULATION_CONTENT', content: {name: 'period', value: response.years}});
    };

    const handlePeriod = () => {
        if(data) {
            const arr = [];
            for(let i = 0; i <= data.years; i++) {
                arr.push(i);
            }
            setPeriod(arr);
        }
    };

    const handleCalculations = () => {
        const firstException = /^CF#0$/;
        const discountedRevertException = /^RD#[0-9]{1,}$/;
        const helperArray = [];
        const headers = data.header.map(header => {
            const details = period.map(year => {
                const stateId = `${header.calculate_id}${year}`;
                const replaceIndex = header.calculate_name.replace(/index/g, year);
                if(firstException.test(stateId)) {
                    dispatch({type: 'SUMMARY_CALCULATE', content: {name: [stateId], calculation: '-E110'}});
                    return +calculations('-E110', state);
                } else {
                    if(discountedRevertException.test(stateId)) {
                        const calc = calculations(replaceIndex, state);
                        helperArray.push(calc);
                        const found = helperArray.find(element => element);
                        helperArray.fill(found);
                        if(helperArray.length === +data.years + 1 && helperArray.includes(undefined)) {
                            helperArray.fill(+data.years + 1);
                        }
                        dispatch({type: 'ADD_CALCULATION_CONTENT', content: {name: stateId, value: helperArray[helperArray.length - 1]}});
                    } else {
                        dispatch({type: 'SUMMARY_CALCULATE', content: {name: [stateId], calculation: replaceIndex}});
                        return +calculations(replaceIndex, state);
                    }
                }
            });
            return {
                name: header.name,
                description: header.description,
                items: helperArray.length > 0 ? helperArray : details
            };
        });
        setTableContent(headers);
    };

    return (
        <div className="table-container">
            <div className="table">
                <TableRow classname="header" name={translations.year} items={period}/>
                {tableContent && tableContent.map(item =>
                    <TableRow key={item.name}
                              name={item.name}
                              items={item.items}
                              description={item.description}
                    />
                )}
            </div>
        </div>
    );
}
