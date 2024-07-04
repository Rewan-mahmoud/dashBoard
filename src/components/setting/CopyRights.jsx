
import React, { useState } from 'react';

export default function CopyRights() {
  const [detailsAr, setDetailsAr] = useState('');
  const [detailsEn, setDetailsEn] = useState('');
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";
  const handleSave = async () => {
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