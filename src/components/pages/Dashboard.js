import React from 'react';
import '../../App.css';
import { UserAuth } from '../../context/AuthContext';

export default function Dashboard() {
    const{user} = UserAuth();
    return (
        <h1 className='dashboard'> DASHBOARD
        </h1>
    );
}