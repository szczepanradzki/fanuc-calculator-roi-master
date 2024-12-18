import React from "react";
import { View, Image, StyleSheet } from "@react-pdf/renderer";

const logo = require("../../assets/images/FANUC-Logo.png");

export function PdfHeader() {
    return (
        <View style={styles.header}>
            <Image src={logo} style={styles.logo}/>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 33 + "px",
        width: 100 + "%",
        backgroundColor: "#FFCE00"
    },
    logo: {
        height: 10 + "px",
        maxWidth: 100 + "%"
    }
});
