import React, { Component } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { Constants } from 'expo';

const StyledStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);
export default StyledStatusBar;

const styles = StyleSheet.create({
    statusBar: {
        height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
    }
});
