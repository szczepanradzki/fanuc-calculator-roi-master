import React, {useState, useEffect, useContext} from 'react';
import {getSection} from '../../graphql/queries/pl/getSection';
import {getSectionEn} from '../../graphql/queries/en/getSection';
import {client} from '../../graphql/client';
import {DynamicTitleValueComponent} from '../Calculator/titleValueComponent';
import {DynamicGreyInput} from '../greyInput';
import {DynamicCalculation} from '../Calculator/dynamicCalculation';
import {DynamicBaseButon} from '../baseButon';
import {Attribute} from '../Calculator/attribute';
import {BorderBox} from '../Calculator/borderBox';
import {AdditionalBox} from '../Calculator/additionalBox';
import {CalculationContext, LayoutContext} from '../../context/layoutContext';
import {Outcome} from '../Calculator/outcome';

const nationalization = {
    pl: {
        query: getSection,
        requested: 'sections'
    },
    eng: {
        query: getSectionEn,
        requested: 'sectionsEns'
    }
};

export function ContentGenerator({section, loadSuccess, currentPage}) {
    const {state, dispatch} = useContext(CalculationContext);
    const {langState} = useContext(LayoutContext);
    const [content, setContent] = useState([]);
    const [contentLength, setContentLength] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const {query, requested} = nationalization[langState];

    useEffect(() => {
        getContent(section);
    }, []);

    useEffect(() => {
        if (currentPage === 5) {
            setLoaded(1 + loaded);
            setTimeout(() => {
                loaded === contentLength && loadSuccess(true);
            }, 1000);
        }
    }, [content, state]);

    const getContent = async (header = '') => {
        const getSections = await client.query({
            query: query, variables: {
                sectionName: header
            }
        });
        const sections = await getSections.data[requested][0].dynamic_content;
        if (sections) {
            generateContent(sections);
        }
    };

    const setValues = (id, value) => {
        if (id && value) {
            dispatch({type: 'ADD_CALCULATION_CONTENT', content: {name: id, value: value}});
        }
    };
    const generateContent = (list) => {
        setContentLength(list.length);
        list.map(item => {
            switch (item.__typename) {
                case 'ComponentCaclculatorCommponentsTitleCommponent': {
                    setContent(content => [...content,
                        <DynamicTitleValueComponent key={item.id} content={item} setValue={setValues}/>]);
                    break;
                }
                case 'ComponentCaclculatorCommponentsGreyInput': {
                    setContent(content => [...content,
                        <DynamicGreyInput key={item.id} content={item} setValue={setValues}/>]);
                    break;
                }
                case 'ComponentCaclculatorCommponentsCalculation': {
                    setContent(content => [
                        ...content, <DynamicCalculation key={item.id} content={item}/>
                    ]);
                    break;
                }
                case 'ComponentCaclculatorCommponentsButton': {
                    setContent(content => [...content, <DynamicBaseButon key={item.id} content={item}/>]);
                    break;
                }
                case 'ComponentCaclculatorCommponentsAttribute': {
                    setContent(content => [...content, <Attribute key={item.id} content={item}/>]);
                    break;
                }
                case 'ComponentCaclculatorCommponentsBorderBox': {
                    setContent(content => [...content, <BorderBox key={item.id} content={item}/>]);
                    break;
                }
                case 'ComponentCaclculatorCommponentsOutcome': {
                    setContent(content => [...content, <Outcome key={item.id} content={item}/>]);
                    break;
                }
                case 'ComponentCaclculatorCommponentsAdditionalBox': {
                    setContent(content => [...content,
                        <AdditionalBox key={item.id} content={item} setValue={setValues}/>]);
                    break;
                }
                default: {
                    console.log('This element is have unsupported rendering: ' + item.__typename);
                }
            }
        });
    };
    return (
        <div>
            {content}
        </div>

    );
}
