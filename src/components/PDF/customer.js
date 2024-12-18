import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

export function Customer({name, company, translations, title}) {
    return (
        <View style={styles.wrapper}>
            <Text style={[styles.text, {fontSize: 20}]}>{translations.title} - {title ? `Kalkulacja "${title}"` : "Kalkulacja bez nazwy"}</Text>
            <Text style={[styles.text, {fontSize: 36}]}>{name}</Text>
            <Text style={[styles.text, {fontSize: 28}]}>{company}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 48 + "px"
    },
    text: {
        fontWeight: 700
    }
});
