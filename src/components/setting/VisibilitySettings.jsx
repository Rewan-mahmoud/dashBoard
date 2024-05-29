import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import './VisibilitySettings.css'; // Import the CSS file

export default function VisibilitySettings() {
    const [visibility, setVisibility] = useState({
        row1: { show: false, hide: false },
        row2: { show: false, hide: false },
        row3: { show: false, hide: false },
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
            <table className="table table-bordered mx-auto">
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
                        <td>Mark</td>
                        <td onClick={() => toggleVisibility('row1', 'show')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row1.show ? '#4CAF50' : 'gray'} />
                        </td>
                        <td onClick={() => toggleVisibility('row1', 'hide')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row1.hide ? '#4CAF50' : 'gray'} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td onClick={() => toggleVisibility('row2', 'show')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row2.show ? '#4CAF50' : 'gray'} />
                        </td>
                        <td onClick={() => toggleVisibility('row2', 'hide')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row2.hide ? '#4CAF50' : 'gray'} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry the Bird</td>
                        <td onClick={() => toggleVisibility('row3', 'show')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row3.show ? '#4CAF50' : 'gray'} />
                        </td>
                        <td onClick={() => toggleVisibility('row3', 'hide')}>
                            <FontAwesomeIcon icon={faCircleCheck} color={visibility.row3.hide ? '#4CAF50' : 'gray'} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
