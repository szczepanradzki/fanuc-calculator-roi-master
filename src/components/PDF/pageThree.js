import React from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PdfHeader } from "./pdfHeader";
import { PdfFooter } from "./pdfFooter";

export function PageThree({state, globalStyles}) {
    return (
        <Page size="A4" style={globalStyles.main}>
            <View style={globalStyles.headerWrapper}
                  fixed>
                <PdfHeader/>
            </View>
            <View style={[globalStyles.content, {paddingTop: 15 + "px"}]}>
                {state.table.length > 0 &&
                state.table.map(value =>
                    <Text style={styles.description}>{value.description}</Text>
                )}
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
    description: {
        marginBottom: 15 + "px",
        fontSize: 12,
        fontWeight: 500
    }
});
