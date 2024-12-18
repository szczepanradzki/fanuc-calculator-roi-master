import React from "react";
import { View, StyleSheet, Image, Text } from "@react-pdf/renderer";

const logo = require("../../assets/images/FANUC-Logo-white.png");

export function PdfFooter() {
    return (
        <View style={styles.footer}>
            <Image src={logo} style={styles.logo}/>
            <Text style={styles.text}>sales@fanuc.pl | 71 77 66 160</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 44 + "px",
        backgroundColor: "#000000"
    },
    logo: {
        marginRight: 9 + "px",
        height: 10 + "px",
        maxWidth: 100 + "%"
    },
    text: {
        color: "#FFFFFF",
        fontSize: 7,
        fontWeight: 500
    }
});
