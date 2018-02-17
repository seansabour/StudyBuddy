import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
const NOTIFICATION_KEY = 'MOBILE_FLASH_CARDS';
const NAMESPACE_STORE = 'MOBILE_FLASH_CARDS:/decks';

// getDecks: return all of the decks along with their titles, questions, and answers.
export const getDecks = async () => {
    try {
        let val = await AsyncStorage.getItem(NAMESPACE_STORE);
        return val || {};
    } catch (error) {
        throw Error(`Error occured: ${err}`);
    }
};
// getDeck: take in a single id argument and return the deck associated with that id.
export const getDeck = async id => {
    try {
        let decks = await AsyncStorage.getItem(NAMESPACE_STORE);
        decks = JSON.parse(decks);
        return decks[id];
    } catch (error) {
        throw Error(`Error occured: ${err}`);
    }
};
// saveDeckTitle: take in a single title argument and add it to the decks.
export const saveDeckTitle = async title => {
    try {
        let decks = await AsyncStorage.getItem(NAMESPACE_STORE);
        decks = JSON.parse(decks);

        if (decks) {
            if (decks[title]) {
                throw `${title} deck already exists.`;
            }
            decks[title] = { title, questions: [] };
        } else {
            decks = {
                ...decks,
                [title]: { title, questions: [] }
            };
        }

        await AsyncStorage.setItem(NAMESPACE_STORE, JSON.stringify(decks));
        return AsyncStorage.getItem(NAMESPACE_STORE);
    } catch (error) {
        // Error saving data
        throw Error(error.toString());
    }
};

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export const addCardToDeck = async (title, card) => {
    try {
        let decks = await AsyncStorage.getItem(NAMESPACE_STORE);
        decks = JSON.parse(decks);
        const diffObj = {
            [title]: {
                questions: [...decks[title].questions, card]
            }
        };
        await AsyncStorage.mergeItem(NAMESPACE_STORE, JSON.stringify(diffObj));
        return AsyncStorage.getItem(NAMESPACE_STORE);
    } catch (err) {
        throw Error(`Error occured: ${err}`);
    }
};

export const removeAllDecks = async () => {
    try {
        await AsyncStorage.removeItem(NAMESPACE_STORE);

        return {};
    } catch (err) {
        throw Error(`Error occured: ${err}`);
    }
};

export const setLocalNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                    ({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(17);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            );

                            AsyncStorage.setItem(
                                NOTIFICATION_KEY,
                                JSON.stringify(true)
                            );
                        }
                    }
                );
            }
        });
};

function createNotification() {
    return {
        title: 'Teach me how to study!',
        body: "👋 Don't forget to get your daily studying in!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    };
}
