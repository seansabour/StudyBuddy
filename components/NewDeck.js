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
import { saveDeckTitle, invalidTitleNotification } from '../actions';
import { NavigationActions } from 'react-navigation';

class NewDeck extends Component {
    state = { deckTitle: '' };

    static navigationOptions = {
        title: 'Add New Deck',
        headerStyle: {
            backgroundColor: '#131e3a'
        },
        headerTintColor: '#edf9ff'
    };

    handleAddDeck = async () => {
        const { deckTitle } = this.state;
        if (!deckTitle) {
            return await this.props.invalidTitleNotification();
        }
        await this.props.saveDeckTitle(deckTitle);
        this.setState({ deckTitle: '' });
        Keyboard.dismiss();
    };

    render() {
        const { alerts } = this.props;
        return (
            <KeyboardAvoidingView behavior="position" style={styles.container}>
                <Hoshi
                    label={'Deck Title'}
                    style={styles.textInput}
                    borderColor={'#b76c94'}
                    value={this.state.deckTitle}
                    onChangeText={text => this.setState({ deckTitle: text })}
                />

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#98CBFD' }]}
                    onPress={this.handleAddDeck}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        Submit Deck
                    </Text>
                </TouchableOpacity>

                <Text style={[styles.notification, { color: alerts.color }]}>
                    {alerts.message}
                </Text>
            </KeyboardAvoidingView>
        );
    }
}
function mapStateToProps(state) {
    return {
        alerts: state.notification
    };
}
function mapDispatchToProps(dispatch, { navigation }) {
    return {
        saveDeckTitle: title => dispatch(saveDeckTitle(title)),
        invalidTitleNotification: () => dispatch(invalidTitleNotification()),
        resetToHome: () => navigation.navigate({ routeName: 'Home' })
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
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
        marginTop: 20
    },
    notification: {
        alignSelf: 'center',
        marginTop: 10
    }
});
