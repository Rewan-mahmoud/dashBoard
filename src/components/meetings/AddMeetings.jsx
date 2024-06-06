import React, { useState } from 'react';
import trash from '../../assests/trash.svg';
import add from '../../assests/add-image.svg';
import upload from '../../assests/uploaddd.svg';
export default function AddMeetings() {

  return (
    <div className='container DoctorsProfile tables bg-white'>
      <div className="tableTitle d-flex justify-content-between">
        <h3>اضافة لقاء   </h3>
        
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
            <label htmlFor="formGroupExampleInput">المضيف :</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">نوع اللقاء:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">عدد مقاعد:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">السعر:</label>
            <input type="text" className="form-control" />
          </div>
       
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">التاريخ:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="formGroupExampleInput">الوقت:</label>
            <input type="text" className="form-control" />
          </div>
         <div className="col-md-12">
            <label htmlFor="formGroupExampleInput">التفاصيل :</label>
            <input type="text" className="form-control py-5" />
          </div>
         <div className="col-md-12">
            <label htmlFor="formGroupExampleInput">التفاصيل باللغة الانجليزية:</label>
            <input type="text" className="form-control py-5" />
          </div>
         <div className="col-md-12">
            <label htmlFor="formGroupExampleInput">الاهداف:</label>
            <input type="text" className="form-control py-5" />
          </div>
         <div className="col-md-12">
            <label htmlFor="formGroupExampleInput">الاهداف باللغة الانجليزية:</label>
            <input type="text" className="form-control py-5" />
          </div>
          <div
            className='BottomButtons'>
                <button className='save'>
                    <span> حفظ</span>
                </button>
                <button className='cancel'>
                    <span> الغاء</span>
                </button>
            </div>
        </div>
      </form>
    </div>
  );
}
