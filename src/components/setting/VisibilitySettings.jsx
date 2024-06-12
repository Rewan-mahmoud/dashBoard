import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import './VisibilitySettings.css'; // Import the CSS file

export default function VisibilitySettings() {
    const [visibility, setVisibility] = useState({
        row1: { show: false, hide: false },
        row2: { show: false, hide: false },
        row3: { show: false, hide: false },
        row4: { show: false, hide: false },
        row5: { show: false, hide: false },
        row6: { show: false, hide: false },
        row7: { show: false, hide: false },
        row8: { show: false, hide: false },
        row9: { show: false, hide: false },
    });

    const toggleVisibility = (row, type) => {
        setVisibility(prevVisibility => ({
            ...prevVisibility,
            [row]: { ...prevVisibility[row], [type]: !prevVisibility[row][type] }
        }));
    };

    return (
        <div className="container">
            <div className="tableTitle d-flex justify-content-between">
                <h3>اظهار واخفاء بعد التفاصيل</h3>    
            </div>
            <table className="table  table-bordered mx-auto">
                <thead>
                    <tr>
                        <th scope="col">الرقم</th>
                        <th scope="col">الخانات</th>
                        <th scope="col">اظهار</th>
                        <th scope="col">اخفاء</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>الاسئلة و الاجابات</td>
                 
                        <td onClick={() => toggleVisibility('row1', 'show')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row1.show ? '#4CAF50' : 'gray'} />
                        </td>
                        <td onClick={() => toggleVisibility('row1', 'hide')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row1.hide ? '#4CAF50' : 'gray'} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>الفئات</td>
                        <td onClick={() => toggleVisibility('row2', 'show')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row2.show ? '#4CAF50' : 'gray'} />
                        </td>
                        <td onClick={() => toggleVisibility('row2', 'hide')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row2.hide ? '#4CAF50' : 'gray'} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                
                        <td>  جلسة فورية</td>
                        <td onClick={() => toggleVisibility('row3', 'show')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row3.show ? '#4CAF50' : 'gray'} />
                        </td>
                        <td onClick={() => toggleVisibility('row3', 'hide')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row3.hide ? '#4CAF50' : 'gray'} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>  الطب النفسي العام 
                        </td>
                        <td onClick={() => toggleVisibility('row4', 'show')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row4.show ? '#4CAF50' : 'gray'} />
                        </td>
                        <td onClick={() => toggleVisibility('row4', 'hide')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row4.hide ? '#4CAF50' : 'gray'} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>   زيارة منزلية  
                        </td>
                        <td onClick={() => toggleVisibility('row5', 'show')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row5.show ? '#4CAF50' : 'gray'} />
                        </td>
                        <td onClick={() => toggleVisibility('row5', 'hide')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row5.hide ? '#4CAF50' : 'gray'} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">6</th>
                        <td>   العلاقات الاسرية   
                        </td>
                        <td onClick={() => toggleVisibility('row6', 'show')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row6.show ? '#4CAF50' : 'gray'} />
                        </td>
                        <td onClick={() => toggleVisibility('row6', 'hide')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row6.hide ? '#4CAF50' : 'gray'} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">7</th>
                        <td>   العلاج النفسي السلوكي    
                        </td>
                        <td onClick={() => toggleVisibility('row7', 'show')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row7.show ? '#4CAF50' : 'gray'} />
                        </td>
                        <td onClick={() => toggleVisibility('row7', 'hide')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row7.hide ? '#4CAF50' : 'gray'} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">8</th>
                        <td>   زيارة المركز      
                        </td>
                        <td onClick={() => toggleVisibility('row8', 'show')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row8.show ? '#4CAF50' : 'gray'} />
                        </td>
                        <td onClick={() => toggleVisibility('row8', 'hide')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row8.hide ? '#4CAF50' : 'gray'} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
