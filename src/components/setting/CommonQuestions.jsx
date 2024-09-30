import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the translation hook

export default function CommonQuestions() {
    const { t } = useTranslation(); // Use the translation function

    return (
        <>
            <div className="tableTitle d-flex justify-content-between">
                <h3>{t('commonQuestions.title')}</h3> {/* Translated title */}
            </div>
            <div className="container mb-5">
                <div className="row mb-5">
                    <div className="col-md-6">
                        <label htmlFor="textareaAr1" className="form-label">{t('commonQuestions.questionAr')}</label>
                        <textarea className="form-control" id="textareaAr1" rows="4"></textarea>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="textareaEn1" className="form-label">{t('commonQuestions.questionEn')}</label>
                        <textarea className="form-control" id="textareaEn1" rows="4"></textarea>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-6">
                        <label htmlFor="textareaAr2" className="form-label">{t('commonQuestions.answerAr')}</label>
                        <textarea className="form-control" id="textareaAr2" rows="4"></textarea>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="textareaEn2" className="form-label">{t('commonQuestions.answerEn')}</label>
                        <textarea className="form-control" id="textareaEn2" rows="4"></textarea>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-6">
                        <label htmlFor="textareaAr3" className="form-label">{t('commonQuestions.answerAr')}</label>
                        <textarea className="form-control" id="textareaAr3" rows="4"></textarea>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="textareaEn3" className="form-label">{t('commonQuestions.answerEn')}</label>
                        <textarea className="form-control" id="textareaEn3" rows="4"></textarea>
                    </div>
                </div>
                <div className="col-md-12">
                    <label htmlFor="usage" className="form-label">{t('commonQuestions.howToUse')}</label>
                    <textarea className="form-control" id="usage" rows="4"></textarea>
                </div>
                <div className='BottomButtons mt-5'>
                    <button className='save'>
                        <span>{t('commonQuestions.save')}</span> {/* Translated save button */}
                    </button>
                    <button className='cancel'>
                        <span>{t('commonQuestions.cancel')}</span> {/* Translated cancel button */}
                    </button>
                </div>
            </div>
        </>
    );
}
