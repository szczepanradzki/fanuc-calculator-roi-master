import React, { useContext } from "react";
import { Query } from "../../graphql/query-component";
import { LayoutContext } from "../../context/layoutContext";
import { Content } from "./content";
import { Multimedia } from "./multimedia";
import {nationalizations} from "../../utils/nationalizations";

const nationalization = nationalizations[3];

export function Step3() {
    const {langState} = useContext(LayoutContext);
    const {query, requested, sections} = nationalization[langState];

    return (
        <Query query={query}>
            {(response) => {
                return (
                    <main className="flex flex-end">
                        <Multimedia dataBase={response.data[requested]} process={process} classname="step3"/>
                        <Content sections={response.data[requested][sections]} classname="step3"/>
                    </main>
                );
            }}
        </Query>
    );
}
