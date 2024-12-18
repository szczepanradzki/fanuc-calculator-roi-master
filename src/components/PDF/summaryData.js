import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { numbersWithSpaces } from '../../utils/numbersSpacer';

export function SummaryData({state, currency, translations}) {
    return (
        <View style={[styles.wrapper, {marginTop: 12 + "px"}]}>
            <View style={styles.costWrapper}>
                <View>
                    <Text style={styles.spentTitle}>Capex On</Text>
                </View>
                <View style={styles.valueWrapper}>
                    <Text style={[styles.spentValue]}>{numbersWithSpaces(state["E110"])}</Text>
                    <Text style={[styles.spentValue, styles.unit]}>{currency}</Text>
                </View>
            </View>
            <View style={styles.costWrapper}>
                <View>
                    <Text style={styles.spentTitle}>{translations.expectedCapital}</Text>
                </View>
                <View style={styles.valueWrapper}>
                    <Text style={[styles.spentValue]}>{(+state["E111"] * 100)}</Text>
                    <Text style={[styles.spentValue, styles.unit]}>%</Text>
                </View>
            </View>
            <View style={styles.costWrapper}>
                <View>
                    <Text style={styles.spentTitle}>{translations.expectedPeriod}</Text>
                </View>
                <View style={styles.valueWrapper}>
                    <Text style={[styles.spentValue]}>{state["E112"]}</Text>
                    <Text style={[styles.spentValue, styles.unit]}/>
                </View>
            </View>
            <View style={styles.costWrapper}>
                <View>
                    <Text style={styles.spentTitle}>{translations.monthSaving}</Text>
                </View>
                <View style={styles.valueWrapper}>
                    <Text style={[styles.spentValue]}>{numbersWithSpaces(state["E113"])}</Text>
                    <Text style={[styles.spentValue, styles.unit]}>{currency}</Text>
                </View>
            </View>
            <View style={[styles.costWrapper, {marginTop: 12 + "px"}]}>
                <View>
                    <Text style={styles.spentTitle}>{translations.simpleRevert}</Text>
                </View>
                <View style={styles.valueWrapper}>
                    <Text style={[styles.spentValue]}>{state["E115"]}</Text>
                    <Text style={[styles.spentValue, styles.unit]}>m-cy</Text>
                </View>
            </View>
            <View style={styles.costWrapper}>
                <View>
                    <Text style={styles.spentTitle}>{translations.disclosedRevert}</Text>
                </View>
                <View style={styles.valueWrapper}>
                    <Text style={[styles.spentValue]}>{state["E116"]}</Text>
                    <Text style={[styles.spentValue, styles.unit]}>m-cy</Text>
                </View>
            </View>
            <View style={[styles.costWrapper, {marginTop: 12 + "px"}]}>
                <View>
                    <Text style={styles.spentTitle}>NPV</Text>
                </View>
                <View style={styles.valueWrapper}>
                    <Text style={[styles.spentValue]}>{numbersWithSpaces(state["E117"])}</Text>
                    <Text style={[styles.spentValue, styles.unit]}>{currency}</Text>
                </View>
            </View>
            <View style={styles.costWrapper}>
                <View>
                    <Text style={styles.spentTitle}>IRR</Text>
                </View>
                <View style={styles.valueWrapper}>
                    <Text style={[styles.spentValue]}>{(+state["E118"] * 100).toFixed(2)}</Text>
                    <Text style={[styles.spentValue, styles.unit]}>%</Text>
                </View>
            </View>
            <View style={styles.costWrapper}>
                <View>
                    <Text style={styles.spentTitle}>ROI</Text>
                </View>
                <View style={styles.valueWrapper}>
                    <Text style={[styles.spentValue]}>{typeof state["E119"] === "number" ? (+state["E119"] * 100).toFixed(2) : state["E119"]}</Text>
                    <Text style={[styles.spentValue, styles.unit]}>%</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: 100 + "%"
    },
    costWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 100 + "%"
    },
    spentTitle: {
        fontSize: 14,
        fontWeight: 700
    },
    valueWrapper: {
        flexDirection: "row"
    },
    spentValue: {
        fontSize: 12,
        fontWeight: 700
    },
    unit: {
        marginLeft: 3 + "px"
    }
});
