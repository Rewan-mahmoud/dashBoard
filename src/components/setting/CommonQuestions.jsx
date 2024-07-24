export default function CommonQuestions() {
    return (
        <>
            <div className="tableTitle d-flex justify-content-between">
                <h3>الاسئلة الشائعة    </h3>
            </div>
            <div className="container mb-5">
                <div className="row mb-5">
                    <div className="col-md-6">
                        <label htmlFor="textareaAr1" className="form-label">السؤال باللغة العربية:</label>
                        <textarea className="form-control" id="textareaAr1" rows="4"></textarea>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="textareaEn1" className="form-label">السؤال باللغة الانجليزية:</label>
                        <textarea className="form-control" id="textareaEn1" rows="4"></textarea>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-6">
                        <label htmlFor="textareaAr2" className="form-label">الاجابة باللغة العربية:</label>
                        <textarea className="form-control" id="textareaAr2" rows="4"></textarea>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="textareaEn2" className="form-label">الاجابة  باللغة الإنجليزية:</label>
                        <textarea className="form-control" id="textareaEn2" rows="4"></textarea>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-6">
                        <label htmlFor="textareaAr2" className="form-label">الاجابة باللغة العربية:</label>
                        <textarea className="form-control" id="textareaAr2" rows="4"></textarea>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="textareaEn2" className="form-label">الاجابة  باللغة الإنجليزية:</label>
                        <textarea className="form-control" id="textareaEn2" rows="4"></textarea>
                    </div>
                </div>
                <div className="col-md-12">
                        <label htmlFor="textareaEn2" className="form-label">  كيفية الاستخدام :</label>
                        <textarea className="form-control" id="textareaEn2" rows="4"></textarea>
                    </div>
                    <div className='BottomButtons mt-5'>
            <button className='save'>
              <span>حفظ</span>
            </button>
            <button className='cancel'>
              <span>الغاء</span>
            </button>
          </div>
            </div>
        </>
    );
}
