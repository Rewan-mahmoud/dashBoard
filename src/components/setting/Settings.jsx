import './setting.css'; 
import upload from '../../assests/uploaddd.svg'
function Settings() {
    return (<>

<nav class="navbar navbar-expand-lg navbar-light mb-4 bg-light">
      <div class="collapse navbar-collapse" >
        <ul class="setting navbar-nav">
          <li class="nav-item ">
            <a class="nav-link active" href="#">أعدادات عامة</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">اظهار و اخفاء بعض التفاصيل</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">سياسة الاسترجاع</a>
          </li>
          <li class="nav-item">
        <a class="nav-link " href="#"> حقوق الملكية والنشر</a>
          </li>
          <li class="nav-item">
        <a class="nav-link " href="#"> الاسئلة الشائعة</a>
          </li>
        </ul>
      </div>
    </nav>
      <div className="container  tables bg-white mt-5">

        <div className="tableTitle d-flex justify-content-between">

          <h3>اعدادات عامة</h3>    
          <p>الشعار</p>
        </div>
  
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form method="post" action="#" id="#">
                <div className="form-group files">
                  <img src={upload} alt="" />
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
      </div>
    </>
  
    );
  }
  
  export default Settings;
  
