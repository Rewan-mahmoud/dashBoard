import plus from '../../assests/plus.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
export default function AddServices() {


    return(
        <>
           <div className="container settingForm tables bg-white mt-5">
          <div className="tableTitle  ">
          <h3>الخدمات  </h3>

          </div>
   <div className="row">
    <div className="col-md-3">
    <div className="custom-select">
    <select type="text" className="form-control">
    <option value="option1"> الفئات الرئيسية</option>
    <option value="option2"> جلسة فورية </option>
    <option value="option3"> الطب النفسي العام  </option>
    <option value="option3">  زيارة منزلية </option>
    <option value="option3">  الاطفال و اليافعين  </option>
  </select>
  <div className="arrow-icon">
  <FontAwesomeIcon icon={faChevronDown} />
  </div>
</div>
    </div>
    <div className="col-md-3">
    <div className="custom-select">
    <select type="text" className="form-control">
    <option value="option1"> الفئات الفرعية</option>
    <option value="option2"> اضطرابات التعليم </option>
    <option value="option3"> اضطرابات التوحد  </option>
    <option value="option3"> ADHD  </option>
    <option value="option3"> اضطرابات الذكاء  </option>
  </select>
  <div className="arrow-icon">
  <FontAwesomeIcon icon={faChevronDown} />
  </div>
</div>
    </div>
</div>
<div className="row">
    <div className="col-md-3">
    <div className="custom-select">
    <select type="text" className="form-control">
    <option value="option1"> المختصون</option>
    <option value="option2"> احمد محمد </option>
    <option value="option3"> ماجد عبدالله  </option>
    <option value="option3"> عبدالله البشر  </option>
  </select>
  <div className="arrow-icon">
  <FontAwesomeIcon icon={faChevronDown} />
  </div>
</div>
    </div>
    <div className="col-md-3">
        <div className='AddServicesButton'>
        <button  > 
            <img src={plus} alt="" />
            <span className='pe-3'> اضافة </span>   
           </button>
        </div>
    </div>
</div>
<table class="table mt-5 table-borderless">
  <thead>
    <tr>
      <th scope="col">الرقم</th>
      <th scope="col">نوع الجلسة</th>
      <th scope="col">عدد الجلسات</th>
      <th scope="col">مدة الجلسات </th>
      <th scope="col">السعر  </th>
      <th scope="col">الاوقات  </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>نفسية</td>
      <td> 5</td>
    <td><span>30 دقيقة</span></td>
      <td>500 رس</td>
      <td> 5م الي 7 م</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>نفسية</td>
      <td>2</td>
      <td> <span>30 دقيقة</span></td>
      <td>500 رس</td>
      <td> 5م الي 7 م</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>نفسية</td>
      <td>2</td>
      <td> <span>30 دقيقة</span></td>
      <td>500 رس</td>
      <td> 5م الي 7 م</td>
    </tr>

  
  </tbody>
</table>
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
        </>
    )
}