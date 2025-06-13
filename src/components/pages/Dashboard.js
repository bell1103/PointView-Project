import React from 'react';
import '../../App.css';
import { UserAuth } from '../../context/AuthContext';
import Cards from '../Cards';

function Dashboard() {
    
    const{user} = UserAuth();
    return (
        <div className='dashboard-container'>
            <>
                <h1 className='dashboard'> DASHBOARD</h1>
                <div className='video-display'>
                    <Cards />
                </div>
            </>
        </div>
    );
    
}

export default Dashboard;