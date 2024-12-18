import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { numbersWithSpaces } from '../../utils/numbersSpacer';

export function SummaryOverview({state, translations}) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.mainDetails}>
                <View>
                    <Text style={styles.mainDetailTitle}>{translations.roi}</Text>
                    <Text style={styles.mainDetailDescription}>{translations.roiDescription}</Text>
                </View>
                <View style={styles.valueWrapper}>
                    <Text style={[styles.mainValue]}>{numbersWithSpaces(state["E102"])}</Text>
                    <Text style={[styles.mainValue]}>%</Text>
                </View>
            </View>
            <View style={styles.mainDetails}>
                <View>
                    <Text style={styles.mainDetailTitle}>{translations.revertPeriod}</Text>
                    <Text style={styles.mainDetailDescription}>{translations.roiDescription}</Text>
                </View>
                <View style={styles.valueWrapper}>
                    <Text style={[styles.mainValue]}>{numbersWithSpaces(state["E103"])}</Text>
                    <Text style={[styles.mainUnit]}>m-cy</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: 100 + "%"
    },
    valueWrapper: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    mainDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 100 + "%"
    },
    mainDetailTitle: {
        textTransform: "uppercase",
        fontSize: 18,
        fontWeight: 700
    },
    mainDetailDescription: {
        fontSize: 12,
        fontWeight: 500
    },
    mainValue: {
        fontSize: 45,
        fontWeight: 700
    },
    mainUnit: {
        marginTop: 0,
        marginBottom: 6 + "px",
        marginLeft: 4 + "px",
        fontSize: 16
    }
});
