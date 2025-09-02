import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const Loading = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#1E90FF" />
  </View>
);