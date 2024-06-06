import React, { useState } from 'react';
import trash from '../../assests/trash.svg';
import Plusss from '../../assests/Plusss.svg';

export default function AddTreatmentPlans() {
  const [treatmentStages, setTreatmentStages] = useState([{ id: 1, type: '', number: '' }]);
  const [treatmentPhases, setTreatmentPhases] = useState([{ id: 1, arabicName: '', englishName: '', sessions: '' }]);
  const [specialists, setSpecialists] = useState([{ id: 1, specialist: '', schedule: '' }]);

  const addRow = (setter, data) => {
    setter(prev => [...prev, { ...data, id: prev.length + 1 }]);
  };

  const removeRow = (id, setter) => {
    setter(prev => prev.filter(row => row.id !== id));
  };

  const handleChange = (id, setter, field, value) => {
    setter(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const renderRows = (rows, setter, fields) => (
    rows.map((row, index) => (
      <div className=" d-flex justify-content-between  work mt-3 mb-3" key={row.id}>
        {fields.map((field, idx) => (
          <div className={` col-md-${12 / fields.length} mb-3`} key={idx}>
            <label htmlFor={`${field}-${row.id}`}>{field.label}:</label>
            <input
              type="text"
              className="form-control"
              id={`${field.name}-${row.id}`}
              value={row[field.name]}
              onChange={(e) => handleChange(row.id, setter, field.name, e.target.value)}
            />
          </div>
        ))}
        {row.id !== 1 && (
          <img
            src={trash}
            className="trash mt-4"
            alt="Delete"
            onClick={() => removeRow(row.id, setter)}
          />
        )}
      </div>
    ))
  );

  return (
    <div className='container DoctorsProfile tables bg-white'>
      <div className="tableTitle d-flex justify-content-between">
        <h3>اضافية خطة علاجية</h3>
      </div>

      <form>
        <div className="settingForm justify-content-between">
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="formGroupExampleInput">الاسم باللغة العربية:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="formGroupExampleInput">الاسم باللغة الانجليزية:</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="formGroupExampleInput">عدد المراحل:</label>
            <input type="text" className="form-control" />
          </div>

          <div id="treatment-stages-container" className="col-md-10 mb-3">
            {renderRows(treatmentStages, setTreatmentStages, [
              { name: 'type', label: 'نوع الجلسات' },
              { name: 'number', label: 'عددها' }
            ])}
          </div>

          <div className="col-md-12 text-align-left mt-3 mb-3 AddTreatmentPlansButton">
            <span type="button" onClick={() => addRow(setTreatmentStages, { type: '', number: '' })}>
              <img className='mt-2' src={Plusss} alt="Add" />
            </span>
          </div>

          <div className="col-md-12 mb-3">
            <label htmlFor="formGroupExampleInput">تفاصيل الخطة باللغة العربية:</label>
            <input type="text" className="form-control py-5" />
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="formGroupExampleInput">تفاصيل الخطة باللغة الانجليزية:</label>
            <input type="text" className="form-control py-5" />
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="formGroupExampleInput">اهداف الخطة باللغة العربية:</label>
            <input type="text" className="form-control py-5" />
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="formGroupExampleInput">اهداف الخطة باللغة الانجليزية:</label>
            <input type="text" className="form-control py-5" />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="formGroupExampleInput">السعر:</label>
            <input type="text" className="form-control py-3" />
          </div>

          <div className="tableTitle d-flex justify-content-between">
            <h3 className='mt-5'>اضافية مرحلة علاجية</h3>
          </div>
        <div id="treatment-phases-container" className="col-md-12 mb-3">
            {renderRows(treatmentPhases, setTreatmentPhases, [
              { name: 'arabicName', label: 'الاسم باللغة العربية' },
              { name: 'englishName', label: 'الاسم باللغة الانجليزية' },
              { name: 'sessions', label: 'عدد الجلسات' }
            ])}
          </div>

          <div className="col-md-12 text-align-left mt-3 mb-3 AddTreatmentPlansButton">
            <span type="button" onClick={() => addRow(setTreatmentPhases, { arabicName: '', englishName: '', sessions: '' })}>
              <img className='mt-2' src={Plusss} alt="Add" />
            </span>
          </div>

          <div className="tableTitle d-flex justify-content-between">
            <h3 className='mt-5'>المختصون والمواعيد</h3>
          </div>
          <div id="specialists-container" className="col-md-6 mb-3">
            {renderRows(specialists, setSpecialists, [
              { name: 'specialist', label: 'المختصون' },
              { name: 'schedule', label: 'المواعيد' }
            ])}
          </div>

          <div className="col-md-12 text-align-left mb-5 AddTreatmentPlansButton">
            <span type="button" onClick={() => addRow(setSpecialists, { specialist: '', schedule: '' })}>
              <img className='mt-2' src={Plusss} alt="Add" />
            </span>
          </div>

          <div className='BottomButtons'>
            <button className='save'>
              <span>حفظ</span>
            </button>
            <button className='cancel'>
              <span>الغاء</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
