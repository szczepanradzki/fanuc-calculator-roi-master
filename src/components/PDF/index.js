import React from 'react';
import {Document, StyleSheet, Font, View, Text} from '@react-pdf/renderer';

import {PageOne} from './pageOne';
import {PageTwo} from './pageTwo';
import {PageThree} from './pageThree';
import ParamPages from "./ParamPages";
import {Customer} from "./customer";

const ParamPageHeader = (customer, translations, title) => ({page}) => {
    if (page === 0) {
        return <View style={styles.wrapper}>
            <Customer name={customer.username}
                      company={customer.company_name}
                      translations={translations}
                      title={title}
            />
            <Text style={styles.title}>{translations.parameters}</Text>
            <View style={styles.line}/>
        </View>;
    }
    return <View style={styles.wrapper}>
        <Text style={styles.title}>{translations.parameters}</Text>
        <View style={styles.line}/>
    </View>;
}

export function SummaryDocument({pagesData, title, customer, state, currency = 'zł', translations, clauses}) {
    const documentTitle = `${translations.title} ${customer.username} ${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    const preparedState = prepareState(state);
    return (
        <Document title={documentTitle}>
            {pagesData &&
            <ParamPages
                state={state}
                data={pagesData}
                globalStyles={styles}
                ParamPageHeader={ParamPageHeader(customer, translations, title)}
                currency={currency}
            />
            }
            <PageOne customer={customer}
                     title={title}
                     renderCustomerHeader={!pagesData}
                     state={preparedState}
                     currency={currency}
                     globalStyles={styles}
                     translations={translations}
            />
            <PageTwo state={preparedState}
                     globalStyles={styles}
                     currency={currency}
                     translations={translations}
                     clauses={clauses}
            />
            <PageThree state={preparedState}
                       globalStyles={styles}
            />
        </Document>
    );
}

const prepareState = (state) => {
    const newState = {};
    for (let k in state) {
        if (typeof state[k] === "number" && (state[k] == Infinity || isNaN(state[k]))) {
            newState[k] = "-";
        } else {
            newState[k] = state[k];
        }
    }

    return newState;
}

const fontSources = {
    medium: require('../../assets/fonts/DINPro-Medium.ttf'),
    bold: require('../../assets/fonts/DINPro-Bold.ttf'),
    black: require('../../assets/fonts/DINPro-Black.ttf')
};

Font.register({
    family: 'DIN Pro', fonts: [
        {src: fontSources.medium, fontStyle: 'normal', fontWeight: 500},
        {src: fontSources.bold, fontStyle: 'normal', fontWeight: 700},
        {src: fontSources.black, fontStyle: 'normal', fontWeight: 900}
    ]
});

const styles = StyleSheet.create({
    title: {
        marginTop: 24 + 'px',
        color: '#FFCE00',
        textTransform: 'uppercase',
        fontSize: 22,
        fontWeight: 900
    },
    line: {
        marginTop: 24 + 'px',
        marginBottom: 17 + 'px',
        height: 1 + 'px',
        width: 100 + '%',
        backgroundColor: '#000000'
    },
    main: {
        position: 'relative',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontFamily: 'DIN Pro'
    },
    headerWrapper: {
        width: 100 + '%'
    },
    content: {
        paddingBottom: 125 + 'px',
        paddingHorizontal: 65 + 'px',
        width: 100 + '%',
        height: 100 + '%'
    },
    pageNumber: {
        position: 'absolute',
        bottom: 110 + 'px',
        left: 65 + 'px',
        fontSize: 8,
        fontWeight: 500
    },
    footerWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 100 + '%'
    }
});
