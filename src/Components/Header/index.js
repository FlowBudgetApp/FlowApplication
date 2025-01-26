import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Header = ({
    title,
    leftIcon,
    rightIcon,
    onLeftPress,
    onRightPress
}) => (
    <Appbar.Header>
        {leftIcon && (
            <Appbar.Action icon={leftIcon} onPress={onLeftPress} />
        )}
        <Appbar.Content
            title={title}
            titleStyle={{ textAlign: 'center', marginRight: leftIcon ? 0 : 48 }}
        />
        {rightIcon && (
            <Appbar.Action icon={rightIcon} onPress={onRightPress} />
        )}
    </Appbar.Header>
);

export default Header;