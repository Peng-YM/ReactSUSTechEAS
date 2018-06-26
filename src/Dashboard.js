import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


export default () => (
    <Card>
        <CardHeader title={`Hi, ${localStorage.getItem('username')}, welcome back!`} />
        <CardContent>SUSTech Education Administration System</CardContent>
    </Card>
);