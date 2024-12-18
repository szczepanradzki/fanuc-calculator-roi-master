import React from 'react';
import {grouper} from "../../utils/grouper";
import {ParamPage} from "./ParamPage";

export default ({data, state, globalStyles, ParamPageHeader, currency}) => {
    if (typeof data !== 'object') {
        return <></>;
    }
    const pageSectionsGrouped = grouper(data, "pageNumber");
    const orderedPages = Object.keys(pageSectionsGrouped).sort().reduce((obj, key) => {
        obj.push(pageSectionsGrouped[key]);
        return obj;
    }, [])

    return <>
        {orderedPages.map((group, index) =>
            <ParamPage
                ParamPageHeader={ParamPageHeader}
                index={index}
                key={index}
                data={group}
                state={state}
                globalStyles={globalStyles}
                currency={currency}
            />
        )}
    </>
}