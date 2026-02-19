import React from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';

const UserInfo: React.FC<{ heading: string; value: string | undefined }> = ({ heading, value }): React.JSX.Element => (
    <View style={styles.infoRow}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.value}>{value || '—'}</Text>
    </View>
);

const styles = StyleSheet.create({
    infoRow: {
    marginBottom: 14,
  },
  heading: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
})

export default UserInfo;