export default function AddQuestions() {
    
    return (
        <>
            <div className="container tables bg-white mt-5">
            <div className="tableTitle d-flex justify-content-between">
                <h3>الاسئلة الشائعة </h3>
            </div>
            <div className="container AddQuestions mb-5">
                <div className="row mb-5">
                    <div className="col-md-6">
                        <label htmlFor="textareaAr1" className="form-label">السؤال باللغة العربية:</label>
                        <input className="form-control py-4"></input>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="textareaEn1" className="form-label">السؤال باللغة الانجليزية:</label>
                        <input className="form-control py-4"></input>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-6">
                        <label htmlFor="textareaAr2" className="form-label">الاجابة باللغة العربية:</label>
                          <input className="form-control py-4"></input>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="textareaEn2" className="form-label">الاجابة  باللغة الإنجليزية:</label>
              <input className="form-control py-4"></input>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-6">
                        <label htmlFor="textareaAr2" className="form-label">الاجابة باللغة العربية:</label>
                          <input className="form-control py-4"></input>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="textareaEn2" className="form-label">الاجابة  باللغة الإنجليزية:</label>
              <input className="form-control py-4"></input>
                    </div>
                </div>
       
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
        </>
    );
}
