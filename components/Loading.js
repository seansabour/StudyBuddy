import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const CompletedQuiz = ({ color = 'black' }) => {
    // const color = props.color || 'black';

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={color} />
        </View>
    );
};

export default CompletedQuiz;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
