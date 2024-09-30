import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Plusss from '../../assests/Plusss.svg';
import { useAuth } from '../../AuthContext';
import { useTranslation } from 'react-i18next'; // Import translation hook

const AddQuestions = ({ onSave }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the passed row data
  const rowToEdit = location.state?.row; // Access the row data
  const { t } = useTranslation(); // Initialize translation hook

  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [items, setItems] = useState([{ name_ar: '', name_en: '' }]);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Populate the form fields with question and answers data when editing
  useEffect(() => {
    if (rowToEdit) {
      setNameAr(rowToEdit.name_ar);
      setNameEn(rowToEdit.name_en);
      setItems(rowToEdit.answers || [{ name_ar: '', name_en: '' }]);
    }
  }, [rowToEdit]);

  const handleSave = async () => {
    const newQuestion = {
      name_ar: nameAr,
      name_en: nameEn,
      items: items,
    };

    console.log('Data to send:', newQuestion); // Debugging line to inspect the data

    // Proceed to the fetch request
    try {
      const url = rowToEdit
        ? `https://naql.nozzm.com/api/update_questions/${rowToEdit.id}` // Update if editing
        : 'https://naql.nozzm.com/api/add_questions'; // Create new if adding

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          lang: 'en',
        },
        body: JSON.stringify(newQuestion),
      });

      const result = await response.json();
      console.log('Response:', result); // Check the API response
      if (result?.status) {
        onSave(result.status); // Call parent save function if successful
        navigate('/Questions'); // Navigate back to the questions page
      } else {
        setError(result?.message || t('errors.saveFailed'));
      }
    } catch (error) {
      console.error('Error:', error);
      setError(t('errors.network'));
    }
  };

  // Handle change in the answers input fields
  const handleAnswerChange = (index, field, value) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(newItems);
  };

  const handleAddAnswer = () => {
    setItems([...items, { name_ar: '', name_en: '' }]);
  };

  return (
    <>
      <div className="container tables bg-white mt-5">
        <div className="tableTitle d-flex justify-content-between">
          <h3>{rowToEdit ? t('editTitle') : t('addTitle')}</h3>
        </div>
        <div className="container AddQuestions mb-5">
          <div className="row mb-5">
            <div className="col-md-6">
              <label htmlFor="textareaAr1" className="form-label">
                {t('questionAr')}
              </label>
              <input
                className="form-control py-4"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="textareaEn1" className="form-label">
                {t('questionEn')}
              </label>
              <input
                className="form-control py-4"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
            </div>
          </div>
          {items.map((item, index) => (
            <div className="row mb-5" key={index}>
              <div className="col-md-6">
                <label htmlFor={`textareaAr${index + 2}`} className="form-label">
                  {t('answerAr')}
                </label>
                <input
                  className="form-control py-4"
                  value={item.name_ar}
                  onChange={(e) => handleAnswerChange(index, 'name_ar', e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor={`textareaEn${index + 2}`} className="form-label">
                  {t('answerEn')}
                </label>
                <input
                  className="form-control py-4"
                  value={item.name_en}
                  onChange={(e) => handleAnswerChange(index, 'name_en', e.target.value)}
                />
              </div>
            </div>
          ))}
          <div className="col-md-12 text-align-left mt-3 mb-3 AddTreatmentPlansButton">
            <span type="button" onClick={handleAddAnswer}>
              <img className="mt-2" src={Plusss} alt={t('add')} />
            </span>
          </div>
          <div className="BottomButtons">
            <button className="save" onClick={handleSave}>
              <span onClick={() => navigate('/Questions')}>
                {rowToEdit ? t('edit') : t('save')}
              </span>
            </button>
            <button className="cancel" onClick={() => navigate('/Questions')}>
              <span>{t('cancel')}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddQuestions;
