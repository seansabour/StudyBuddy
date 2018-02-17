import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CompletedQuiz = props => (
    <View style={styles.container}>
        <Text style={{ fontSize: 64 }}>🙌</Text>
        <Text style={{ fontSize: 24 }}>Congrats you've completed the quiz</Text>
        <Text style={{ fontSize: 16 }} />
        <Text style={{ fontSize: 16 }}>
            Your score: {props.score.toFixed(2)}%
        </Text>
        <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => props.resetToHome()}>
            <Text style={{ color: 'blue' }}>Go back home</Text>
        </TouchableOpacity>
    </View>
);

export default CompletedQuiz;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
