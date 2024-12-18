import React from "react";
import {Page, Text, View, StyleSheet} from "@react-pdf/renderer";
import {PdfHeader} from "./pdfHeader";
import {PdfFooter} from "./pdfFooter";
import {numbersWithSpaces} from '../../utils/numbersSpacer';
import {calculations} from "../../utils/calculations";

const RecordView = ({state, fieldName, fieldReference, unit, description, config, textBold, valueBold, rounded, currency}) => {
    const value = rounded ? Math.round(calculations(fieldReference, state)) : calculations(fieldReference, state);
    unit = unit ? unit.replace("#currency", currency.toLowerCase()) : unit;

    return <View style={styles.costWrapper}>
        <View style={styles.element}>
            <Text style={[styles.costLine, styles.element, textBold ? styles.bold : {}]}>{fieldName}</Text>
            <Text style={styles.costDescription}>{description}</Text>
        </View>
        {fieldReference &&
        <View style={styles.priceWrapper}>
            <Text style={[styles.costLine, valueBold ? styles.bold : {}]}>{numbersWithSpaces(value)}</Text>
            <Text style={[styles.costLine, styles.currency, valueBold ? styles.bold : {}]}>{unit}</Text>
        </View>
        }
    </View>
}

const Section = ({state, currency, header, subheader, records}) => {
    const headers = [[header, styles.title], [subheader, styles.topHeader]]
        .filter(row => row[0])
        .map(row => <Text style={row[1]}>{row[0]}</Text>);

    return <View style={styles.wrapper}>
        {headers.map(Header => Header)}
        {records.map((props, index) => <RecordView key={index} state={state} {...props} currency={currency}/>)}
    </View>
}


export const ParamPage = ({globalStyles, data, state, currency, index, ParamPageHeader}) => {
    return (
        <Page size="A4" style={globalStyles.main}>
            <View style={globalStyles.headerWrapper}
                  fixed>
                <PdfHeader/>
            </View>
            <View style={globalStyles.content}>
                <ParamPageHeader page={index}/>
                {data.map((props, index) => <Section key={index} state={state} {...props} currency={currency}/>)}
                <Text style={globalStyles.pageNumber}
                      render={({pageNumber}) => (`${pageNumber}`)}
                      fixed
                />
            </View>
            <View style={globalStyles.footerWrapper}
                  fixed>
                <PdfFooter/>
            </View>
        </Page>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "#FFCE00",
        fontSize: 16,
        fontWeight: 700,
        textTransform: "uppercase"
    },
    wrapper: {
        marginTop: 12 + "px",
        marginBottom: 20 + "px",
        width: 100 + "%"
    },
    topHeader: {
        marginBottom: 7 + "px",
        fontSize: 14,
        fontWeight: 700
    },
    costWrapper: {
        flexDirection: "row",
        marginBottom: 5 + "px",
        width: 100 + "%"
    },
    costLine: {
        fontSize: 10,
        fontWeight: 500
    },
    costDescription: {
        fontSize: 8,
        fontWeight: 500
    },
    bold: {
        fontWeight: 700
    },
    element: {
        width: 80 + "%"
    },
    priceWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: 20 + "%"
    },
    currency: {
        marginLeft: 3 + "px"
    }
})
