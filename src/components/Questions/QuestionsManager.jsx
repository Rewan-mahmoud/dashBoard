import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import AddQuestions from './AddQuestions';
import Questions from './Questions';



const QuestionsManager = () => {
  const [data, setData] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/questions', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
      
          },
          body: JSON.stringify({}),
        });
        const result = await response.json();
        if (result.status) {
          setData(result.data.data || []);
        } else {
          console.error('Failed to fetch data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addQuestion = (newQuestion) => {
    setData([...data, newQuestion]);
  };

  return (
    <div>
      <AddQuestions onSave={addQuestion} />
      <Questions data={data} setData={setData} />
    </div>
  );
};

export default QuestionsManager;
