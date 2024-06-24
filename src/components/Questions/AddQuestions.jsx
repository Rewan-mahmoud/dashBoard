import React, { useState } from 'react';

const AddQuestions = ({ onSave }) => {
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [answerAr, setAnswerAr] = useState('');
  const [answerEn, setAnswerEn] = useState('');
  const [answerAr2, setAnswerAr2] = useState('');
  const [answerEn2, setAnswerEn2] = useState('');
  const [error, setError] = useState(null);

  const handleSave = async () => {
    const newQuestion = {
      name_ar: nameAr,
      name_en: nameEn,
      name_ar: answerAr,
      name_en: answerEn,
      name_ar: answerAr2,
      name_en: answerEn2,
    };

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";

    try {
      const response = await fetch('https://naql.nozzm.com/api/add_questions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'lang': 'en',
        },
        body: JSON.stringify({ items: [newQuestion] }),
      });
      const result = await response.json();
      if (result.status) {
        onSave(result.data); // Pass the new question to the parent component
        setNameAr('');
        setNameEn('');
        setAnswerAr('');
        setAnswerEn('');
        setAnswerAr2('');
        setAnswerEn2('');
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to save the question. Please try again.');
    }
  };

  return (
    <>
      <div className="container tables bg-white mt-5">
        <div className="tableTitle d-flex justify-content-between">
          <h3>الاسئلة الشائعة</h3>
        </div>
        <div className="container AddQuestions mb-5">
          <div className="row mb-5">
            <div className="col-md-6">
              <label htmlFor="textareaAr1" className="form-label">السؤال باللغة العربية:</label>
              <input
                className="form-control py-4"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="textareaEn1" className="form-label">السؤال باللغة الانجليزية:</label>
              <input
                className="form-control py-4"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md-6">
              <label htmlFor="textareaAr2" className="form-label">الاجابة باللغة العربية:</label>
              <input
                className="form-control py-4"
                value={answerAr}
                onChange={(e) => setAnswerAr(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="textareaEn2" className="form-label">الاجابة باللغة الإنجليزية:</label>
              <input
                className="form-control py-4"
                value={answerEn}
                onChange={(e) => setAnswerEn(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md-6">
              <label htmlFor="textareaAr3" className="form-label">الاجابة الثانية باللغة العربية:</label>
              <input
                className="form-control py-4"
                value={answerAr2}
                onChange={(e) => setAnswerAr2(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="textareaEn3" className="form-label">الاجابة الثانية باللغة الإنجليزية:</label>
              <input
                className="form-control py-4"
                value={answerEn2}
                onChange={(e) => setAnswerEn2(e.target.value)}
              />
            </div>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className='BottomButtons'>
            <button className='save' onClick={handleSave}>
              <span>حفظ</span>
            </button>
            <button className='cancel'>
              <span>الغاء</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddQuestions;
