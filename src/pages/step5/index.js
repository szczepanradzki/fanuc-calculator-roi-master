import React, { useContext } from "react";
import { Query } from "../../graphql/query-component";
import {LayoutContext} from "../../context/layoutContext";
import { Content } from "./content";
import { Multimedia } from "./multimedia";
import {getPdfData} from "../../graphql/queries/pl/pdf";
import {debug} from "../../utils/debug";
import {nationalizations} from "../../utils/nationalizations";

const nationalization = nationalizations[5];

const nationalizationPdf = {
    pl: {
        query: getPdfData,
        requested: "page_sections_pl"
    },
    eng: {
        query: getPdfData,
        requested: "page_sections_en"
    }
};

const Step5Component = ({response, pdfData}) => {
    const {langState} = useContext(LayoutContext);
    const {requested, sections} = nationalization[langState];

    return (
        <main className="flex flex-end">
            <Multimedia dataBase={response.data[requested]} process={process} classname="step5"/>
            <Content pdfData={pdfData} sections={response.data[requested][sections]} classname="step5"/>
        </main>
    );
}

export function Step5() {
    const {langState} = useContext(LayoutContext);
    const {query: step5Query} = nationalization[langState];
    const {query: pdfQuery, requested} = nationalizationPdf[langState];

    const getPdfData = (pdfResponse) => {
        if (pdfResponse?.data?.pdf !== null
            && typeof pdfResponse?.data?.pdf[requested] !== 'undefined'
            && (pdfResponse?.data?.pdf?.ready || debug)) {
            return pdfResponse?.data?.pdf[requested];
        }

        return null;
    }

    return (
        <Query query={step5Query}>
            {(step5Response) =>
            <Query query={pdfQuery} ignoreError={true}>
                {pdfResponse => <Step5Component response={step5Response} pdfData={getPdfData(pdfResponse)}/>}
            </Query>
            }
        </Query>
    );
}
