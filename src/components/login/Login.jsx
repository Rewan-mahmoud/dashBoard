
import img from '../../assests/logo.png';
import cuate from '../../assests/cuate.svg';
import React from 'react';

function Login() {
  return (
    <div className="LoginPage row">
        <div className='rightSide col-md-6 bg-white'>
   
         <div>
            <img src={img} width="100" alt=""/>
            <a className='title'>خبراء النفس</a>
          </div>
       <div className='text-center'>
       <h1 className=''>مرحبا !</h1>
       <p >مرحبا بعودتك! ادخل بياناتك</p>
      <form className='mt-5'>
  <div class="form-group mb-4 ">
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=" البريد الالكتروني"/>
  </div>
  <div class="form-group  mb-4">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="كلمة السر"/>
  </div>
 <div className='text-center '>
  <button type="submit" className="LoginPageButton">تسجيل الدخول</button>

 </div>
</form>
        </div> 
    
        </div>
        <div className='leftSide  col-md-6'>
            <img src={cuate} alt="" />
        </div>
  
    </div>
  );
}

export default Login;
