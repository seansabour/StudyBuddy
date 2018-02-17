import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator } from 'react-navigation';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import AddCard from './components/AddCard';
import NewDeck from './components/NewDeck';

const RootNavigator = StackNavigator({
    Home: {
        screen: DeckList
    },
    Deck: {
        screen: Deck
    },
    AddCard: {
        screen: AddCard
    },
    Quiz: {
        screen: Quiz
    }
});

const MainNavigation = TabNavigator(
    {
        Home: {
            screen: RootNavigator,
            navigationOptions: {
                title: 'Available Decks',
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="ios-albums" size={24} />
                )
            }
        },
        NewDeck: {
            screen: StackNavigator({ NewDeck: { screen: NewDeck } }),
            navigationOptions: {
                title: 'Add New Deck',
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons
                        name="ios-add-circle"
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true
        }
    }
);

export default MainNavigation;
