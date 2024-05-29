import React, { useState } from 'react';
import trash from '../../assests/trash.svg';
import add from '../../assests/add-image.svg';
export default function DoctorData() {
  const [works, setWorks] = useState([{ id: 1, start: '', end: '' }]);

  const addWork = () => {
    setWorks([...works, { id: works.length + 1, start: '', end: '' }]);
  };

  const removeWork = (id) => {
    if (id !== 1) { // Ensure the first work item is not removed
      setWorks(works.filter(work => work.id !== id));
    }
  };

  return (
    <div className='container DoctorsProfile tables bg-white'>
      <div className="tableTitle d-flex justify-content-between">
        <h3>بيانات الطبيب المعالج </h3>
      </div>

      <form>
        <div className="row settingForm justify-content-around">
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">الاسم باللغة العربية:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">الاسم باللغة الانجليزية:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">رقم الجوال:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">الجنس:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">الايميل:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">الدولة:</label>
            <input type="text" className="form-control" />
          </div>

          <div id="work-container" className="col-md-12">
            {works.map((work, index) => (
              <div className="d-flex justify-content-around work mt-3" key={work.id}>
                <div className="col-md-5">
                  <label htmlFor={`start-${work.id}`}>بداية دوام:</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`start-${work.id}`}
                    value={work.start}
                    onChange={(e) => {
                      const newWorks = [...works];
                      newWorks[index].start = e.target.value;
                      setWorks(newWorks);
                    }}
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor={`end-${work.id}`}>نهاية دوام:</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`end-${work.id}`}
                    value={work.end}
                    onChange={(e) => {
                      const newWorks = [...works];
                      newWorks[index].end = e.target.value;
                      setWorks(newWorks);
                    }}
                  />
                </div>
                {work.id !== 1 && (
                  <img
                    src={trash}
                    className="trash"
                    alt="Delete"
                    onClick={() => removeWork(work.id)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="col-md-12 mt-3 addAnotherWork">
            <input
              type="button"
              value="اضافة دوام اخر"
              className="form-control text-center addWork"
              onClick={addWork}
            />
          </div>

          <form method="post" action="#" id="#">
        <div className="form-group files">
        <label htmlFor="formGroupExampleInput">صورة:</label>
        <img className="addUpload" src={add} alt="" />
        <div className='fileUpload'>اسقط او اسحب,او <span> اختار</span>  ملفا للتحميل</div>
        <input type="file" className="form-control" multiple="" />
        </div>
         </form>

         <div className="col-md-12">
            <label htmlFor="formGroupExampleInput">الخبرة:</label>
            <input type="text" className="form-control " />
          </div>
         <div className="col-md-12">
            <label htmlFor="formGroupExampleInput">سيرة شحصية:</label>
            <input type="text" className="form-control py-5" />
          </div>
         <div className="col-md-12">
            <label htmlFor="formGroupExampleInput">سيرة شحصية:</label>
            <input type="text" className="form-control py-5" />
          </div>
        
   
        </div>
      </form>
    </div>
  );
}
