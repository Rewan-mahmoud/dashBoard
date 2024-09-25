import React, { useState, useEffect } from 'react';
import AddMeetings from './AddMeetings';
import Meetings from './Meetings';

import { useAuth } from '../../AuthContext';
const MeetingsManager = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const { token } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://naql.nozzm.com/api/ecounters', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'lang': 'ar',
                    }
                });
                const result = await response.json();
                if (result.status) {
                    setData(result.data.data || []);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError('Error fetching data');
            }
        };

        fetchData();
    }, []);

    const addMeeting = (newMeeting) => {
        setData([...data, newMeeting]);
    };

    return (
        <div>
            <AddMeetings onSave={addMeeting} />
            <Meetings data={data} setData={setData} error={error} />
        </div>
    );
};

export default MeetingsManager;
