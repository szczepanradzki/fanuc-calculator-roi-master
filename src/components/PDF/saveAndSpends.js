import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { numbersWithSpaces } from '../../utils/numbersSpacer';

export function SaveAndSpends({state, currency = "zł", translations}) {
    const total = (+state["E93"] + +state["E94"] + +state["E95"] + +state["E96"] + +state["E97"] - +state["E89"]).toFixed(2);
    return (
        <View style={styles.wrapper}>
            <View style={styles.category}>
                <Text style={styles.title}>{translations.spends}</Text>
                <View style={styles.costWrapper}>
                    <View style={styles.element}>
                        <Text style={styles.spentTitle}>Total Cost of Ownership (TCO)</Text>
                        <Text style={styles.spentDescription}>{translations.tco}</Text>
                    </View>
                    <View style={styles.priceWrapper}>
                        <Text style={[styles.spentTitle, {fontWeight: 700}]}>{numbersWithSpaces(state["E89"])}</Text>
                        <Text style={[styles.spentTitle, styles.currency, {fontWeight: 700}]}>{currency}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.category}>
                <Text style={styles.title}>{translations.savings}</Text>
                <View style={styles.costWrapper}>
                    <View style={styles.element}>
                        <Text style={styles.spentTitle}>{translations.works}</Text>
                        <Text style={styles.spentDescription}>{translations.worksDescription}</Text>
                    </View>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.spentTitle}>{numbersWithSpaces(state["E93"])}</Text>
                        <Text style={[styles.spentTitle, styles.currency]}>{currency}</Text>
                    </View>
                </View>
                <View style={styles.costWrapper}>
                    <View style={styles.element}>
                        <Text style={styles.spentTitle}>{translations.workersAbsence}</Text>
                    </View>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.spentTitle}>{numbersWithSpaces(state["E94"])}</Text>
                        <Text style={[styles.spentTitle, styles.currency]}>{currency}</Text>
                    </View>
                </View>
                <View style={styles.costWrapper}>
                    <View style={styles.element}>
                        <Text style={styles.spentTitle}>{translations.raiseAmount}</Text>
                        <Text style={styles.spentDescription}>{translations.raiseAmountDescription}</Text>
                    </View>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.spentTitle}>{numbersWithSpaces(state["E95"])}</Text>
                        <Text style={[styles.spentTitle, styles.currency]}>{currency}</Text>
                    </View>
                </View>
                <View style={styles.costWrapper}>
                    <View style={styles.element}>
                        <Text style={styles.spentTitle}>{translations.raiseQuality}</Text>
                        <Text style={styles.spentDescription}>{translations.raiseQualityDescription}</Text>
                    </View>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.spentTitle}>{numbersWithSpaces(state["E96"])}</Text>
                        <Text style={[styles.spentTitle, styles.currency]}>{currency}</Text>
                    </View>
                </View>
                <View style={styles.costWrapper}>
                    <View style={styles.element}>
                        <Text style={styles.spentTitle}>{translations.extraSavings}</Text>
                        <Text style={styles.spentDescription}>{translations.extraSavingsDescription}</Text>
                    </View>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.spentTitle}>{numbersWithSpaces(state["E97"])}</Text>
                        <Text style={[styles.spentTitle, styles.currency]}>{currency}</Text>
                    </View>
                </View>
                <View style={[styles.costWrapper, {marginTop: 15 + "px"}]}>
                    <View style={styles.element}>
                        <Text style={[styles.spentTitle, {fontWeight: 700}]}>{translations.summary}</Text>
                    </View>
                    <View style={styles.priceWrapper}>
                        <Text style={[styles.spentTitle, {fontWeight: 700}]}>{numbersWithSpaces(total)}</Text>
                        <Text style={[styles.spentTitle, styles.currency, {fontWeight: 700}]}>{currency}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 12 + "px",
        marginBottom: 20 + "px",
        width: 100 + "%"
    },
    category: {
        marginBottom: 17 + "px"
    },
    title: {
        marginBottom: 7 + "px",
        fontSize: 14,
        fontWeight: 700
    },
    costWrapper: {
        flexDirection: "row",
        marginBottom: 5 + "px",
        width: 100 + "%"
    },
    spentTitle: {
        fontSize: 10,
        fontWeight: 500
    },
    spentDescription: {
        fontSize: 8,
        fontWeight: 500
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

});
