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
import { getDecks, removeAllDecks, removeDeck } from '../actions/';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as api from '../utils/helpers';
import Swipeout from 'react-native-swipeout';
import EmptyDeck from './EmptyDeck';

class DeckList extends Component {
    state = { activeRow: null };

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

    componentDidMount() {
        this.props.navigation.setParams({
            removeAllDecks: this.props.removeAllDecks
        });
    }

    componentWillMount() {
        this.props.getDecks();
    }

    _renderRow = ({ item, index }) => {
        const { navigate } = this.props.navigation;

        const swipeSettings = {
            autoClose: true,
            close: item.title !== this.state.activeRow,
            onClose: (secId, rowId, direction) =>
                this.onSwipeClose(item.title, rowId, direction),
            onOpen: (secId, rowId, direction) =>
                this.onSwipeOpen(item.title, rowId, direction),
            right: [
                {
                    onPress: () => this.props.removeDeck(item.title),
                    text: 'Delete',
                    type: 'delete'
                }
            ],
            rowId: index,
            sectionId: 1
        };

        return (
            <Swipeout {...swipeSettings}>
                <TouchableOpacity
                    style={styles.item}
                    onPress={() =>
                        navigate('Deck', {
                            title: item.title
                        })
                    }>
                    <Text style={styles.header}>{item.title}</Text>
                    <Text style={styles.subHeader}>
                        {item.questions.length} flash cards
                    </Text>
                </TouchableOpacity>
            </Swipeout>
        );
    };

    onSwipeOpen(rowId, direction) {
        if (typeof direction !== 'undefined') {
            this.setState({ activeRow: rowId });
        }
    }

    onSwipeClose(rowId, direction) {
        if (
            rowId === this.state.activeRow &&
            typeof direction !== 'undefined'
        ) {
            this.setState({ activeRow: null });
        }
    }

    render() {
        const { decks } = this.props;

        const title =
            this.props.navigation.state.params &&
            this.props.navigation.state.params.title;

        if (decks.length === 0) {
            return <EmptyDeck />;
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={decks}
                    renderItem={this._renderRow}
                    extraData={this.state.activeRow}
                    keyExtractor={(item, index) => item.title}
                />
            </View>
        );
    }
}

const mapStateToProps = (state, { navigation }) => ({
    decks: Object.entries(state.decks).map(([key, val]) => val)
});

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        getDecks: () => dispatch(getDecks()),
        removeAllDecks: () => dispatch(removeAllDecks()),
        removeDeck: title => dispatch(removeDeck(title))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckList);

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
