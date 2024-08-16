import React, { useState } from 'react';
import './setting.css'; 
import upload from '../../assests/uploaddd.svg';

function PublicSettings() {
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
  
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzNmYzNkNS02YTUwLTRlNDItODcyOS1jZWFjYWRkOTc2ODAiLCJqdGkiOiJkNDY4M2RhOTEwMTQwY2NhOWNiNTk4ZTIyYWM4NGQxZTg0OTQ2OWY5NjExYTgwYzg0N2ZiNDdjNmEwMTI4YzFkMzY5ODQxZTgzMmE4ODcwNSIsImlhdCI6MTcxODIwMjI5OS4xODMxNTIsIm5iZiI6MTcxODIwMjI5OS4xODMxNTUsImV4cCI6MTc0OTczODI5OS4xNzkyNTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Yx9dWC5YZY1qUoOzlKvp-IQQCYvv-lBzmRZIoBYcM7DTWsdMPAR470lfw84TDfw-taGdpHmOXOj5hyyIxcjHHZrwOqVqOS2vRQ-VUNV5d8frSyj4edCcqUgLmdFY8DmozazAG2na_jewgFdeElA7ozZZE-QSfPYSho6UZL-a7TzInp3SJli47Bo7GjiV4Patcr26YJIqHXkvjFy-UVZeLLrslZOMzZjN144Yih8d_nXlXvyhqnOY7c9DDMMzFQ5Hz6pMpBYvpgAw-WdIgYXKQ8h3qDFVD5MhV9VXWLh46XsOgl6eKg7L-AA_9NUtweOn5f2uY0Qw2Gbd226tCjirJ3u1GkdkYbTzNIeqxYumbx3hsctHc9D1zNU4qq1ruKAWpjleHBfyvwGA0rYIRynwPiPkophy8eEVeJWuxeTkC9ooaIhdkNnh6yV9HpKrQbObLXamrwNWxZgLp5qV4dhi3zofd0gWrVea_I-oQshUKH8Fzz2YTnZOewJWK8nxgaYv70UOQaD6PheH1ILAsS1qZBc7agnjhuTkVA0n9dmhenUuzEUQ4rPG7tumUOrRPLlxrJNqeVBXz41b2SSett7Za4Al65wkfckSCe5ER2C7-o5_F9INvJzkuPJ6uYsZtXSrzw6lOJ9KbEdfW2VZq2shYt-jjFDQobYj7hdBDqD4eOE";

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
        setSuccessMessage('تم ارسال البيانات بنجاح'); // Set success message on success
      } else {
        setSuccessMessage(result.message || 'Failed to update settings.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className="tableTitle d-flex justify-content-between">
        <h3>اعدادات عامة</h3>    
        <span className='text-align'>الشعار</span>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form method="post" action="#" id="#">
              <div className="form-group files">
                <img className='upload' src={upload} alt="" />
                <div className='fileUpload'>
                  اسقط او اسحب,او <span> اختار</span>  ملفا للتحميل
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
            <label for="formGroupExampleInput"> العنوان</label>
            <input type="text" className="form-control" onChange={(e) => setTaxNumber(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label for="formGroupExampleInput"> رقم الجوال للدعم الفني</label>
            <input type="text" className="form-control" onChange={(e) => setSupportNumber(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label for="formGroupExampleInput"> رقم واتساب الصيدلية</label>
            <input type="text" className="form-control" onChange={(e) => setPharmacistWhatsapp(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label for="formGroupExampleInput"> رقم الصيدلي</label>
            <input type="text" className="form-control" onChange={(e) => setPharmacistPhone(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label for="formGroupExampleInput"> الرقم الضريبي</label>
            <input type="text" className="form-control" onChange={(e) => setTaxNumber(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label for="formGroupExampleInput"> الوقت</label>
            <input type="text" className="form-control" onChange={(e) => setOnboardingOneAr(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label for="formGroupExampleInput">تعديل تفاصيل صفحة on boarding باللغة العربية</label>
            <input type="text" className="form-control" onChange={(e) => setOnboardingOneAr(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label for="formGroupExampleInput">تعديل تفاصيل صفحة on boarding باللغة الانجليزية</label>
            <input type="text" className="form-control" onChange={(e) => setOnboardingOneEn(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label for="formGroupExampleInput">تعديل تفاصيل صفحة on boarding باللغة العربية</label>
            <input type="text" className="form-control" onChange={(e) => setOnboardingTwoAr(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label for="formGroupExampleInput">تعديل تفاصيل صفحة on boarding باللغة الانجليزية</label>
            <input type="text" className="form-control" onChange={(e) => setOnboardingTwoEn(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label for="formGroupExampleInput">تعديل تفاصيل صفحة on boarding باللغة العربية</label>
            <input type="text" className="form-control" onChange={(e) => setOnboardingThreeAr(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label for="formGroupExampleInput">تعديل تفاصيل صفحة on boarding باللغة الانجليزية</label>
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
            <span> حفظ</span>
          </button>
          <button type="button" className="cancel">
            <span> الغاء</span>
          </button>
        </div>
      </form>    
    </>
  );
}

export default PublicSettings;
