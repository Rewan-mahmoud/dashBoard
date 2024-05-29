import './setting.css'; 
import { NavLink, Route, Routes } from 'react-router-dom';
import upload from '../../assests/uploaddd.svg';

function PublicSettings() {
  return (
    <>
          <div className="tableTitle d-flex justify-content-between">

<h3>اعدادات عامة</h3>    
<p>الشعار</p>
</div>

<div className="container">
<div className="row">
  <div className="col-md-6">
    <form method="post" action="#" id="#">
      <div className="form-group files">
        <img className='upload' src={upload} alt="" />
     <div className='fileUpload'>اسقط او اسحب,او <span> اختار</span>  ملفا للتحميل</div>
        <input type="file" className="form-control" multiple="" />
     
      </div>
    </form>
  </div>
  
</div>
</div>
<form>
<div class="row settingForm mt-5">
<div class="col-md-6">
<label for="formGroupExampleInput"> العنوان</label>
<input type="text" class="form-control " />
</div>
<div class="col-md-6">
<label for="formGroupExampleInput"> رقم الجوال للدعم الفني</label>
<input type="text" class="form-control"/>
</div>
<div class="col-md-6">
<label for="formGroupExampleInput"> رقم واتساب الصيدلية</label>
<input type="text" class="form-control"/>
</div>
<div class="col-md-6">
<label for="formGroupExampleInput"> رقم الصيدلي</label>
<input type="text" class="form-control"/>
</div>
<div class="col-md-6">
<label for="formGroupExampleInput"> الرقم الضريبي</label>
<input type="text" class="form-control"/>
</div>
<div class="col-md-6">
<label for="formGroupExampleInput"> الوقت</label>
<input type="text" class="form-control"/>
</div>
<div class="col-md-12">
<label for="formGroupExampleInput">تعديل تفاصيل صفحة on boarding</label>
<input type="text" class="form-control"/>
</div>
</div>
</form>
    </>
  );
}

export default PublicSettings;
