import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { numbersWithSpaces } from '../../utils/numbersSpacer';

export function TableData({state, translations}) {
    const years = [];
    for(let i = 0; i <= state.period; i++) {
        years.push(
            <View style={styles.item}>
                <Text>{i}</Text>
            </View>);
    }

    return (
        <View style={[styles.wrapper, {marginTop: 23 + 'px'}]}>
            <Text>{translations.flow} {state.period} {translations.period}</Text>
            <View style={[styles.row, {marginTop: 10 + 'px'}]}>
                <View style={[styles.item, {flex: 0, width: 13 + '%'}]}>
                    <Text>Rok</Text>
                </View>
                {years}
            </View>
            {state.table.length > 0 ?
                state.table.map(value =>
                    <View style={styles.row}>
                        <View style={[styles.item, {flex: 0, width: 13 + '%'}]}>
                            <Text>{value.name}</Text>
                        </View>
                        {value.items.length > 0 ?
                            value.items.map(item =>
                                <View style={styles.item}>
                                    <Text>{numbersWithSpaces(item)}</Text>
                                </View>
                            ) : <></>
                        }
                    </View>
                ) : <></>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: 100 + '%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100 + '%'
    },
    item: {
        paddingVertical: 5 + 'px',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
        fontSize: 8
    }
});
