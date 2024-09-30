import React, { useState } from 'react';
import './setting.css'; 
import upload from '../../assests/uploaddd.svg';
import { useAuth } from '../../AuthContext';
import { useTranslation } from 'react-i18next'; // Import translation hook

function PublicSettings() {
  const { t } = useTranslation(); // Initialize translation hook
  const [taxNumber, setTaxNumber] = useState('');
  const [supportNumber, setSupportNumber] = useState('');
  const [pharmacistWhatsapp, setPharmacistWhatsapp] = useState('');
  const [pharmacistPhone, setPharmacistPhone] = useState('');
  const [onboardingOneAr, setOnboardingOneAr] = useState('');
  const [onboardingOneEn, setOnboardingOneEn] = useState('');
  const [onboardingTwoAr, setOnboardingTwoAr] = useState('');
  const [onboardingTwoEn, setOnboardingTwoEn] = useState('');
  const [onboardingThreeAr, setOnboardingThreeAr] = useState('');
  const [onboardingThreeEn, setOnboardingThreeEn] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  
  const { token } = useAuth();

  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('tax_number', taxNumber);
    formData.append('support_number', supportNumber);
    formData.append('pharmacist_whatsapp', pharmacistWhatsapp);
    formData.append('pharmacist_phone', pharmacistPhone);
    formData.append('onboardeingone_ar', onboardingOneAr);
    formData.append('onboardeingone_en', onboardingOneEn);
    formData.append('onboardeingtwo_ar', onboardingTwoAr);
    formData.append('onboardeingtwo_en', onboardingTwoEn);
    formData.append('onboardeingthree_ar', onboardingThreeAr);
    formData.append('onboardeingthree_en', onboardingThreeEn);
    if (logoFile) {
      formData.append('logo', logoFile); // Append the file to the form data
    }

    try {
      const response = await fetch(`https://naql.nozzm.com/api/update_setting/1`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,  // Replace with your token
          'lang': 'ar',
          'accept': 'application/json'
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(t('successMessage')); // Set success message on success
      } else {
        setSuccessMessage(result.message || t('errorMessage'));
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage(t('networkError'));
    }
  };

  return (
    <>
      <div className="tableTitle d-flex justify-content-between">
        <h3>{t('settings')}</h3>    
        <span className='text-align'>{t('logo')}</span>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form method="post" action="#" id="#">
              <div className="form-group files">
                <img className='upload' src={upload} alt="" />
                <div className='fileUpload'>
                  {t('uploadInstruction')} <span>{t('chooseFile')}</span>
                </div>
                <input 
                  type="file" 
                  className="form-control" 
                  multiple="" 
                  onChange={handleFileChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="row settingForm mt-5">
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">{t('taxNumber')}</label>
            <input type="text" className="form-control" onChange={(e) => setTaxNumber(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">{t('supportNumber')}</label>
            <input type="text" className="form-control" onChange={(e) => setSupportNumber(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">{t('pharmacistWhatsapp')}</label>
            <input type="text" className="form-control" onChange={(e) => setPharmacistWhatsapp(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">{t('pharmacistPhone')}</label>
            <input type="text" className="form-control" onChange={(e) => setPharmacistPhone(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">{t('onboardingOneAr')}</label>
            <input type="text" className="form-control" onChange={(e) => setOnboardingOneAr(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">{t('onboardingOneEn')}</label>
            <input type="text" className="form-control" onChange={(e) => setOnboardingOneEn(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">{t('onboardingTwoAr')}</label>
            <input type="text" className="form-control" onChange={(e) => setOnboardingTwoAr(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">{t('onboardingTwoEn')}</label>
            <input type="text" className="form-control" onChange={(e) => setOnboardingTwoEn(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">{t('onboardingThreeAr')}</label>
            <input type="text" className="form-control" onChange={(e) => setOnboardingThreeAr(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">{t('onboardingThreeEn')}</label>
            <input type="text" className="form-control" onChange={(e) => setOnboardingThreeEn(e.target.value)} />
          </div>

          {/* Conditionally render success message */}
          {successMessage && (
            <div className="col-12">
              <div className="alert alert-success mt-3">
                {successMessage}
              </div>
            </div>
          )}
        </div>

        <div className="BottomButtons">
          <button type="submit" className="save">
            <span>{t('save')}</span>
          </button>
          <button type="button" className="cancel">
            <span>{t('cancel')}</span>
          </button>
        </div>
      </form>    
    </>
  );
}

export default PublicSettings;
