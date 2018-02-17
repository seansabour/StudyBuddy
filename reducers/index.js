import { combineReducers } from 'redux';
import * as actions from '../actions';

const initialState = {
    decks: {},
    notification: {
        message: '',
        color: 'black'
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.RECEIVED_DECKS:
            return {
                ...state,
                decks: action.decks
            };
        case actions.SAVE_NEW_DECK_FAILED:
            return {
                ...state,
                notification: {
                    message: action.error.toString(),
                    color: 'red'
                }
            };
        case actions.INVALID_TITLE_NOTIFICATION:
        case actions.HIDE_ALERTS:
        case actions.INVALID_CARD:
        case actions.ADDED_CARD_SUCCESS:
            return {
                ...state,
                notification: action.notification
            };
        default:
            return state;
    }
};

export default reducer;
