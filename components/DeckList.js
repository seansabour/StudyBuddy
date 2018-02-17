import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Alert
} from 'react-native';
import Deck from './Deck';
import { connect } from 'react-redux';
import { getDecks, removeAllDecks } from '../actions/';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as api from '../utils/helpers';

class DeckList extends Component {
    componentDidMount() {
        this.props.navigation.setParams({
            removeAllDecks: this.props.removeAllDecks
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Available Decks',
            headerStyle: {
                backgroundColor: '#131e3a'
            },
            headerTintColor: '#edf9ff',
            headerRight: (
                <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={() => {
                        Alert.alert(
                            'Remove Decks',
                            'Are you sure you want to remove all decks, this cannot be undone?',
                            [
                                {
                                    text: 'Cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () =>
                                        navigation.state.params.removeAllDecks()
                                }
                            ],
                            { cancelable: false }
                        );
                    }}>
                    <Ionicons
                        name={'ios-remove-circle-outline'}
                        size={26}
                        color={'white'}
                    />
                </TouchableOpacity>
            )
        };
    };

    componentWillMount() {
        this.props.getDecks();
    }

    render() {
        const { navigate } = this.props.navigation;
        const { decks } = this.props;

        if (decks.length === 0) {
            return (
                <View
                    style={[
                        styles.container,
                        { alignItems: 'center', justifyContent: 'center' }
                    ]}>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                        No available decks!
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={decks}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigate('Deck', { title: item.title })
                                }>
                                <Text style={styles.header}>{item.title}</Text>
                                <Text style={styles.subHeader}>
                                    {item.questions.length} cards
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => item.title}
                />
            </View>
        );
    }
}

function mapStateToProps(state, { navigation }) {
    return {
        decks: Object.entries(state.decks).map(([key, val]) => val)
    };
}

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        getDecks: () => dispatch(getDecks()),
        removeAllDecks: () => dispatch(removeAllDecks())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        flex: 1,
        borderWidth: 0.3,
        borderColor: 'black',
        borderRadius: 5,
        shadowColor: 'gray',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
        backgroundColor: '#F4F4F4',
        padding: 10,
        marginBottom: 5,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    header: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subHeader: {
        fontSize: 12,
        textAlign: 'center',
        padding: 5,
        color: 'gray'
    }
});
