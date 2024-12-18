import React from "react";
import {Page, Text, View, StyleSheet} from "@react-pdf/renderer";
import {PdfHeader} from "./pdfHeader";
import {Customer} from "./customer";
import {SaveAndSpends} from "./saveAndSpends";
import {PdfFooter} from "./pdfFooter";
import {numbersWithSpaces} from '../../utils/numbersSpacer';

export function PageOne({renderCustomerHeader, title, customer, state, globalStyles, currency, translations}) {
    return (
        <Page size="A4" style={globalStyles.main}>
            <View style={globalStyles.headerWrapper}
                  fixed>
                <PdfHeader/>
            </View>
            <View style={globalStyles.content}>
                {renderCustomerHeader &&
                <Customer name={customer.username}
                          company={customer.company_name}
                          translations={translations}
                          title={title}
                />
                }
                {!renderCustomerHeader &&
                <View style={styles.wrapper}>
                    <Text style={globalStyles.title}>{translations.summaryHeader}</Text>
                    <View style={globalStyles.line}/>
                </View>
                }
                <Text style={styles.topHeader}>{translations.savingsSpendsSummary}</Text>
                <SaveAndSpends state={state}
                               currency={currency}
                               translations={translations}
                />
                <Text style={styles.topHeader}>{translations.investSummary}</Text>
                <View style={styles.wrapper}>
                    <View style={styles.costWrapper}>
                        <Text style={[styles.costLine, styles.element]}>{translations.investTotalPrice}</Text>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.costLine}>{numbersWithSpaces(state["E99"])}</Text>
                            <Text style={[styles.costLine, styles.currency]}>{currency}</Text>
                        </View>
                    </View>
                    <View style={styles.costWrapper}>
                        <Text style={[styles.costLine, styles.element]}>{translations.totalIncrease}</Text>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.costLine}>{numbersWithSpaces(state["E100"])}</Text>
                            <Text style={[styles.costLine, styles.currency]}>{currency}</Text>
                        </View>
                    </View>
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
    wrapper: {
        marginBottom: 8 + "px",
        width: 100 + "%"
    },
    topHeader: {
        color: "#FFCE00",
        fontSize: 16,
        fontWeight: 700,
        textTransform: "uppercase"
    },
    costWrapper: {
        flexDirection: "row",
        marginBottom: 5 + "px",
        width: 100 + "%"
    },
    costLine: {
        fontSize: 10,
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
