
import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
export default function CopyRights() {
  const [detailsAr, setDetailsAr] = useState('');
  const [detailsEn, setDetailsEn] = useState('');
  const { token } = useAuth();  const handleSave = async () => {
    try {
      console.log('Sending data:', { details_ar: detailsAr, details_en: detailsEn });

      const response = await fetch('https://naql.nozzm.com/api/_term/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          details_ar: detailsAr,
          details_en: detailsEn,
        }),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        // handle success (e.g., show a success message)
      } else {
        console.error('Error:', response.statusText);
        // handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // handle error (e.g., show an error message)
    }
  };

    return (
    <>
    <div className="tableTitle d-flex justify-content-between">
    
    <h3> حقوق الملكية </h3>    
    </div>
    <div class="mb-5">
      <label for="exampleFormControlTextarea1" className="form-label"> حقوق الملكية  باللغة العربية :</label>
      <textarea
          className="form-control"
          id="detailsAr"
          rows="4"
          value={detailsAr}
          onChange={(e) => setDetailsAr(e.target.value)}
        ></textarea>    </div>
    <div className="mb-3">
      <label for="exampleFormControlTextarea1" className="form-label"> حقوق الملكية  باللغة الانجليزية :</label>
      <textarea
          className="form-control"
          id="detailsEn"
          rows="4"
          value={detailsEn}
          onChange={(e) => setDetailsEn(e.target.value)}
        ></textarea>    </div>
    <div className="BottomButtons">
        <button className="save" onClick={handleSave}>
          <span>حفظ</span>
        </button>
        <button className="cancel">
          <span>الغاء</span>
        </button>
      </div>
    </>
    
    ) 
    
    
    
    
    }