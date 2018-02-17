import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Loading from './Loading';
const { height, width } = Dimensions.get('window');

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { item } = navigation.state.params;

        return {
            headerStyle: {
                backgroundColor: '#131e3a'
            },
            headerTintColor: '#edf9ff',
            headerBackTitle: 'Deck'
        };
    };

    startQuiz = () => {
        const { item } = this.props;
        const { navigate } = this.props.navigation;

        if (!item.questions.length > 0) {
            return alert(
                'Sorry there is currently no flash cards for this deck! Be the first one to add one.'
            );
        }
        navigate('Quiz', { title: item.title });
    };
    render() {
        const { item } = this.props;
        const { navigate } = this.props.navigation;

        if (!item) {
            return <Loading />;
        }

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.headers}>
                        <Text style={styles.header}>{item.title}</Text>
                        <Text style={styles.subHeader}>
                            {item.questions.length} cards
                        </Text>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            onPress={() =>
                                navigate('AddCard', { title: item.title })
                            }
                            style={[
                                styles.button,
                                { backgroundColor: '#98CBFD' }
                            ]}>
                            <Text
                                style={{ color: 'white', fontWeight: 'bold' }}>
                                Add Card
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.startQuiz}
                            style={[
                                styles.button,
                                {
                                    backgroundColor: '#032D58'
                                }
                            ]}>
                            <Text
                                style={{ color: 'white', fontWeight: 'bold' }}>
                                Start Quiz
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = (state, { navigation }) => {
    const { title } = navigation.state.params;
    return {
        item: state.decks[title]
    };
};
export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scroll: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20
    },
    headers: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    header: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subHeader: {
        fontSize: 12,
        textAlign: 'center',
        padding: 5,
        color: 'gray'
    },
    button: {
        alignItems: 'center',
        padding: 30,
        width: 300,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'gray',
        shadowColor: 'gray',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
        marginBottom: 10
    }
});
