import React from 'react';
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PdfHeader } from './pdfHeader';
import { PdfFooter } from './pdfFooter';
import { SummaryOverview } from './summaryOverview';
import { SummaryData } from './summaryData';
import { TableData } from './tableData';

export function PageTwo({state, globalStyles, currency, translations, clauses}) {
    const parseHTMLTags = (text) => {
        const regExp = new RegExp(/(<([^>]+)>)/, 'ig');
        return text.replace(regExp, '');
    };
    return (
        <Page size="A4" style={globalStyles.main} wrap={false}>
            <View style={globalStyles.headerWrapper}
                  fixed>
                <PdfHeader/>
            </View>
            <View style={globalStyles.content}>
                <Text style={styles.title}>{translations.finalData}</Text>
                <View style={styles.line}/>
                <SummaryOverview state={state}
                                 translations={translations}
                />
                <SummaryData state={state}
                             currency={currency}
                             translations={translations}
                />
                <TableData state={state} translations={translations}/>
                <View style={{marginTop: 10 + 'px'}}>
                    <Text style={[styles.clause]}>{parseHTMLTags(clauses.protectionClause)}</Text>
                    <Text style={[styles.clause, {marginTop: 5 + 'px'}]}>{parseHTMLTags(clauses.informationClause)}</Text>
                </View>
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
        marginTop: 24 + 'px',
        marginBottom: 12 + 'px',
        color: '#FFCE00',
        textTransform: 'uppercase',
        fontSize: 22,
        fontWeight: 900
    },
    line: {
        marginTop: 12 + 'px',
        marginBottom: 17 + 'px',
        height: 1 + 'px',
        width: 100 + '%',
        backgroundColor: '#000000'
    },
    clause: {
        fontSize: 6
    }
});
