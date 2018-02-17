import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import CompletedQuiz from './CompletedQuiz';
import Loading from './Loading';

class Quiz extends Component {
    state = { currentIndex: 0, correct: 0, incorrect: 0, showAnswer: false };

    static navigationOptions = ({ navigation }) => {
        const { item } = navigation.state.params;

        return {
            title: 'Quiz',
            headerStyle: {
                backgroundColor: '#131e3a'
            },
            headerTintColor: '#edf9ff'
        };
    };

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        });
    }

    componentWillUnmount() {
        this.animatedValue.removeAllListeners();
    }

    flipCard = () => {
        Animated.spring(this.animatedValue, {
            toValue: this.value > 90 ? 0 : 180
        }).start();

        this.setState(prevState => ({
            showAnswer: !prevState.showAnswer
        }));
    };

    render() {
        let { currentIndex, showAnswer } = this.state;
        const { deck } = this.props;

        const frontAnimatedStyle = {
            transform: [
                {
                    rotateX: this.animatedValue.interpolate({
                        inputRange: [0, 180],
                        outputRange: ['0deg', '180deg']
                    })
                }
            ]
        };
        const backAnimatedStyle = {
            transform: [
                {
                    rotateX: this.animatedValue.interpolate({
                        inputRange: [0, 180],
                        outputRange: ['180deg', '360deg']
                    })
                }
            ]
        };

        if (!deck.questions) {
            return <Loading />;
        }

        if (currentIndex >= deck.questions.length) {
            return (
                <CompletedQuiz
                    score={this.state.correct / deck.questions.length * 100}
                    resetToHome={this.props.resetToHome}
                    title={this.props.navigation.state.params.title}
                    navigate={this.props.navigation.navigate}
                />
            );
        }

        const content = showAnswer ? (
            <Animated.View style={[styles.flipCard, backAnimatedStyle]}>
                <Text
                    style={[
                        styles.heading,
                        { color: '#72bcd4', fontWeight: 'bold' }
                    ]}>
                    Answer:
                </Text>
                <Text style={styles.subheading}>
                    {deck.questions[currentIndex].answer}
                </Text>
            </Animated.View>
        ) : (
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                <Text
                    style={[
                        styles.heading,
                        { color: '#72bcd4', fontWeight: 'bold' }
                    ]}>
                    Question:
                </Text>
                <Text style={styles.subheading}>
                    {deck.questions[currentIndex].question}
                </Text>
            </Animated.View>
        );

        return (
            <View style={styles.container}>
                <View style={styles.questionNumber}>
                    <Text
                        style={{
                            fontWeight: 'bold'
                        }}>
                        {currentIndex + 1} / {deck.questions.length}
                    </Text>
                </View>
                <View style={[styles.content, { marginBottom: 180 }]}>
                    <TouchableOpacity
                        style={{ marginBottom: 15 }}
                        onPress={() => this.flipCard()}>
                        <Text style={styles.showOpposite}>
                            Show {showAnswer ? 'Question' : 'Answer'}{' '}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignSelf: 'stretch' }}>
                        {content}
                    </View>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        onPress={() =>
                            this.setState(prevState => ({
                                currentIndex: prevState.currentIndex + 1,
                                correct: prevState.correct + 1,
                                showAnswer: false
                            }))
                        }
                        style={[styles.button, { backgroundColor: '#00818c' }]}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            Correct
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            this.setState(prevState => ({
                                currentIndex: prevState.currentIndex + 1,
                                incorrect: prevState.incorrect + 1,
                                showAnswer: false
                            }))
                        }
                        style={[styles.button, { backgroundColor: '#781112' }]}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            Incorrect
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state, { navigation }) => {
    const { title } = navigation.state.params;
    return {
        deck: state.decks[title]
    };
};
const mapDispatchToProps = (dispatch, { navigation }) => ({
    resetToHome: () => {
        navigation.dispatch(
            NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })]
            })
        );
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    questionNumber: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        padding: 20
    },
    content: {
        flex: 1,
        padding: 20,
        alignSelf: 'stretch'
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 50
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
    },
    heading: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    subheading: {
        fontSize: 18,
        textAlign: 'center'
    },
    showOpposite: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flipCard: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
        backgroundColor: '#F4F4F4',
        borderColor: 'gray',
        borderRadius: 3,
        borderWidth: 1,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'gray',
        shadowRadius: 1,
        shadowOpacity: 1,
        padding: 50,
        width: '100%',
        height: '100%',
        marginBottom: 100
    }
});
