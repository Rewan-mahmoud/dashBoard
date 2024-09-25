import React, { useState, useEffect } from "react";
import edit from "../../assests/edit.svg";
import deletee from "../../assests/delete.svg";
import plus from "../../assests/plus.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../AuthContext';
const Slider = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [newData, setNewData] = useState({
    id: "",
    image: "",
    imagePreview: "",
  });
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://naql.nozzm.com/api/sliders", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            lang: "ar",
          },
          body: JSON.stringify({}),
        });
        const result = await response.json();
        if (result.status) {
          setData(result.data.data);
        } else {
          console.error("Failed to fetch data:", result.message);
          setError(result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [token]);

  const toggleActive = (id) => {
    const newData = data.map((row) => {
      if (row.id === id) {
        return { ...row, active: !row.active };
      }
      return row;
    });
    setData(newData);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://naql.nozzm.com/api/destroy_slider/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            lang: "en",
          },
        }
      );
      const result = await response.json();
      if (result.status) {
        setData(data.filter((row) => row.id !== id));
      } else {
        console.error("Failed to delete data:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      setError(error.message);
    }
  };

  const handleEditChange = (e, key) => {
    if (key === "image") {
      const file = e.target.files[0];
      setSelectedIcon(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRowData((prevData) => ({
          ...prevData,
          image: file,
          imagePreview: reader.result,
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      const { value } = e.target;
      setNewRowData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };

  const handleSave = async () => {
    const rowToUpdate = data.find((row) => row.id === editingId);
    const formData = new FormData();
    formData.append("image", selectedIcon);
    formData.append("id", rowToUpdate.id);

    try {
      const response = await fetch(
        `https://naql.nozzm.com/api/update_slider/${editingId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            lang: "ar",
            accept: "application/json",
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (result.status) {
        setData(
          data.map((row) =>
            row.id === editingId
              ? {
                  ...row,
                  ...newRowData,
                  image: selectedIcon
                    ? URL.createObjectURL(selectedIcon)
                    : row.image,
                }
              : row
          )
        );
        setEditingId(null);
        setNewRowData({});
        setSelectedIcon(null);
      } else {
        console.error("Failed to save data:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError(error.message);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleAddChange = (e, key) => {
    if (key === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewData((prevData) => ({
          ...prevData,
          image: file,
          imagePreview: reader.result,
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      const { value } = e.target;
      setNewData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };

  const handleAddSave = async () => {
    const formData = new FormData();
    formData.append("image", newData.image);
    formData.append("id", data.length + 1);

    try {
      const response = await fetch("https://naql.nozzm.com/api/add_slider", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.status) {
        setData((prevData) => [
          ...prevData,
          { ...newData, id: data.length + 1, image: newData.imagePreview },
        ]);
        setNewData({
          id: "",
          image: "",
          imagePreview: "",
        });
        setIsAdding(false);
      } else {
        console.error("Failed to add slider:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error adding slider:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container tables bg-white mt-5">
      <div className="tableTitle d-flex justify-content-between">
        <h3>السليدر</h3>
        <button onClick={handleAdd}>
          <img src={plus} alt="" />
          <span className="pe-3">اضافة</span>
        </button>
      </div>

      <table className="table borderless TableDr text-center">
        <thead>
          <tr>
            <th scope="col">الرقم</th>
            <th scope="col">الصورة</th>
            <th scope="col">التحكم</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingId === row.id ? (
                  <>
                    <input
                      type="file"
                      onChange={(e) => handleEditChange(e, "image")}
                    />
                    {newRowData.imagePreview && (
                      <img
                        src={newRowData.imagePreview}
                        alt="Preview"
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={row.image}
                    alt=""
                    style={{ width: "287.68px", height: "127px" }}
                  />
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <>
                    <button className="save-btn" onClick={handleSave}>
                      حفظ
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingId(null)}
                    >
                     الغاء
                    </button>
                  </>
                ) : (
                  <div className="drTableIcon">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={row.active ? "activeIcon" : "inactive"}
                      onClick={() => toggleActive(row.id)}
                    />
                    <img
                      src={edit}
                      alt="Edit"
                      onClick={() => setEditingId(row.id)}
                    />
                    <img
                      src={deletee}
                      alt="Delete"
                      onClick={() => handleDelete(row.id)}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
          {isAdding && (
            <tr>
              <td>{data.length + 1}</td>
              <td>
                <input
                  type="file"
                  onChange={(e) => handleAddChange(e, "image")}
                />
                {newData.imagePreview && (
                  <img
                    src={newData.imagePreview}
                    alt="Preview"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </td>
              <td>
                <button onClick={handleAddSave}>Add</button>
                <button onClick={() => setIsAdding(false)}>Cancel</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Slider;
