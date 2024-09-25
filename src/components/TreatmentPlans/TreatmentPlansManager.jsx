import React, { useState, useEffect } from 'react';
import AddTreatmentPlans from './AddTreatmentPlans';
import TreatmentPlans from './TreatmentPlans';
import { useAuth } from '../../AuthContext';
const { token } = useAuth();
const TreatmentPlansManager = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://naql.nozzm.com/api/planseeions', {
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

  const addPlan = (newPlan) => {
    setData([...data, newPlan]);
  };

  return (
    <div>
      <AddTreatmentPlans onSave={addPlan} />
      <TreatmentPlans data={data} setData={setData} error={error} />
    </div>
  );
};

export default TreatmentPlansManager;
