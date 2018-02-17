import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { Hoshi } from 'react-native-textinput-effects';
import { addCardToDeck, invalidCard } from '../actions';
class AddCard extends Component {
    state = { question: '', answer: '' };

    static navigationOptions = {
        title: 'New flash card',
        headerStyle: {
            backgroundColor: '#131e3a'
        },
        headerTintColor: '#edf9ff'
    };

    handleAddCard = async () => {
        const { question, answer } = this.state;
        const { title } = this.props.navigation.state.params;

        if (!question || !answer) {
            return this.props.invalidCard();
        }

        this.props.addCardToDeck(title, { question, answer });

        this.setState(() => ({
            question: '',
            answer: ''
        }));
        Keyboard.dismiss();
    };

    render() {
        const { alerts } = this.props;
        return (
            <KeyboardAvoidingView behavior="position" style={styles.container}>
                <Hoshi
                    label={'Question'}
                    style={styles.textInput}
                    borderColor={'#b76c94'}
                    value={this.state.question}
                    onChangeText={text => this.setState({ question: text })}
                />
                <Hoshi
                    label={'Answer'}
                    style={styles.textInput}
                    borderColor={'#b76c94'}
                    value={this.state.answer}
                    onChangeText={text => this.setState({ answer: text })}
                />

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#98CBFD' }]}
                    onPress={this.handleAddCard}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        Save Flash Card!
                    </Text>
                </TouchableOpacity>
                <Text
                    style={[
                        styles.notification,
                        {
                            color: alerts.color
                        }
                    ]}>
                    {alerts.message}
                </Text>
            </KeyboardAvoidingView>
        );
    }
}
const mapStateToProps = state => ({
    alerts: state.notification
});

const mapDispatchToProps = (dispatch, { navigation }) => ({
    addCardToDeck: (title, card) => dispatch(addCardToDeck(title, card)),
    invalidCard: () => dispatch(invalidCard())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 10
    },
    textInput: {
        padding: 10,
        marginTop: 10
    },
    heading: {
        textAlign: 'center',
        padding: 10
    },
    button: {
        alignItems: 'center',
        alignSelf: 'center',
        width: 200,
        padding: 15,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'gray',
        shadowColor: 'gray',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
        marginTop: 10
    },
    notification: {
        alignSelf: 'center',
        marginTop: 10
    }
});
