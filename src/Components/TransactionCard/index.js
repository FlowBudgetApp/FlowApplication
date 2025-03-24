import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useTheme } from "../../Components/Theming";

export default function TransactionCard(data) {
    const { theme } = useTheme();
    
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
        <Pressable onPress={data.onPress}>
            <Card style={[styles.card, {backgroundColor: theme.colors.surfaceVariant}]} mode="elevated">
                <View style={[styles.titleRow, {backgroundColor: theme.colors.secondary}]}>
                    <Text variant="titleMedium" style={[styles.titleText, {color: theme.colors.onSecondary,}]}>
                        Banking Account #1
                    </Text>
                </View>
                <Card.Content style={styles.content}>
                    <View style={styles.row}>
                        <View style={styles.leftContent}>
                            <ContentTitle>Payee</ContentTitle>
                            <ContentText>{data.payee}</ContentText>
                            <ContentTitle>Category</ContentTitle>
                            <ContentText>{data.category}</ContentText>
                        </View>
                        <View style={styles.rightContent}>
                            <ContentTitle>Cost</ContentTitle>
                            <ContentText>${data.cost}</ContentText>
                            <ContentTitle>Date</ContentTitle>
                            <ContentText>{data.date}</ContentText>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        overflow: 'hidden',
    },
    titleRow: {
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