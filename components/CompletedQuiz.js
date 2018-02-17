import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

const CompletedQuiz = props => (
    <View style={styles.container}>
        <Text style={{ fontSize: 64 }}>🙌</Text>
        <Text style={{ fontSize: 24 }}>Congrats you've completed the quiz</Text>
        <Text style={{ fontSize: 16 }} />
        <Text style={{ fontSize: 16 }}>
            Your score: {props.score.toFixed(2)}%
        </Text>

        <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() =>
                props.navigation.navigate('Quiz', { title: props.title })
            }>
            <Text style={{ color: 'blue' }}>Restart Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() =>
                props.navigation.navigate('Deck', { title: props.title })
            }>
            <Text style={{ color: 'blue' }}>Back to Deck</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => props.resetToHome()}>
            <Text style={{ color: 'blue' }}>Show all deck</Text>
        </TouchableOpacity>
    </View>
);

export default withNavigation(CompletedQuiz);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
