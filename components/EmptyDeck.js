import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EmptyDeck = props => (
    <View
        style={[
            styles.container,
            { alignItems: 'center', justifyContent: 'center' }
        ]}>
        <TouchableOpacity onPress={() => props.navigation.navigate('NewDeck')}>
            <Text
                style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                Sorry, you currently do not have any available decks.
            </Text>
            <Text
                style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'blue'
                }}>
                Create a new deck!
            </Text>
        </TouchableOpacity>
    </View>
);

export default withNavigation(EmptyDeck);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        flex: 1,
        borderBottomWidth: 0.3,
        borderBottomColor: 'black',
        borderRadius: 5,
        shadowColor: 'gray',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
        backgroundColor: '#F4F4F4',
        padding: 15
    },
    header: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subHeader: {
        fontSize: 14,
        textAlign: 'center',
        color: 'gray',
        fontWeight: 'bold'
    }
});
