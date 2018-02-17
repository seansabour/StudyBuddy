import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import { Provider } from 'react-redux';
import { setLocalNotification } from './utils/helpers';
import configureStore from './configureStore';
import MainNavigation from './Navigation';
import StyledStatusBar from './components/StatusBar';

const store = configureStore();

export default class App extends React.Component {
    componentWillMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StyledStatusBar
                        backgroundColor="#131e3a"
                        barStyle="light-content"
                    />

                    <View style={styles.content}>
                        <MainNavigation />
                    </View>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    content: { flex: 1 },
    mainHeader: {
        paddingTop:
            Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 20,
        height:
            (Platform.OS === 'android' ? 56 : 44) +
            Expo.Constants.statusBarHeight
    },
    headerTitle: {
        alignSelf: 'center'
    }
});
