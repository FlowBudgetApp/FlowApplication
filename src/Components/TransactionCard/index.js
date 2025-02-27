import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function TransactionCard({ payee, category, cost, date, onPress }) {
    const ContentTitle = ({ children }) => (
        <Text variant="labelMedium" style={styles.contentTitle}>
            {children}
        </Text>
    );
    const ContentText = ({ children }) => (
        <Text variant="bodyMedium" style={styles.contentText}>
            {children}
        </Text>
    );

    return (
        <Pressable onPress={onPress}>
            <Card style={styles.card} mode="elevated">
                <View style={styles.titleRow}>
                    <Text variant="titleMedium" style={styles.titleText}>
                        Banking Account #1
                    </Text>
                </View>
                <Card.Content style={styles.content}>
                    <View style={styles.row}>
                        <View style={styles.leftContent}>
                            <ContentTitle>Payee</ContentTitle>
                            <ContentText>{payee}</ContentText>
                            <ContentTitle>Category</ContentTitle>
                            <ContentText>{category}</ContentText>
                        </View>
                        <View style={styles.rightContent}>
                            <ContentTitle>Cost</ContentTitle>
                            <ContentText>${cost}</ContentText>
                            <ContentTitle>Date</ContentTitle>
                            <ContentText>{date}</ContentText>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#f4fbfa',
        overflow: 'hidden',
    },
    titleRow: {
        backgroundColor: '#4a6363',
        padding: 8,
        width: '100%',
    },
    titleText: {
        color: '#ffffff',
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftContent: {
        flex: 1,
        marginRight: 1,
    },
    rightContent: {
        alignItems: 'flex-end',
    },
    contentTitle: {
        color: '#3f4949',
        fontWeight: '500',
    },
    contentText: {
        color: '#050606',
        fontWeight: '500',
    },
    content: {
        marginTop: 8,
    },
});