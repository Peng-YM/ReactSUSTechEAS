import React from 'react';
import Avatar from '@material-ui/core/Avatar';


export const AvatarField = ({ record, size }) => (
    <Avatar
        src={`${record.avatar}?size=${size}x${size}`}
        size={size}
        style={{ width: size, height: size }}
    />
);

AvatarField.defaultProps = {
    size: 25,
};