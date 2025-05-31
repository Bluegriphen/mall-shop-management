import { useState } from "react";
import app from "../../firebase/firebaseconsole";
import { getDatabase, ref, push, set } from "firebase/database";
import { NavLink, useNavigate } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";
import './AdminCreateShop.css'; // Import the CSS file

const AdminCreateShop = () => {
  const [inputField, setInputField] = useState({
    shopNumber: "",
    shopName: "",
    shopFloor: "",
    shopOwnerName: "",
    shopType: "",
  });
  const [error, setError] = useState({});
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = {};
    if (Number(inputField.shopNumber) <= 0) {
      error.er1 = "Number should be greater than 0.";
    } else if (Number(inputField.shopNumber) > 50) {
      error.er2 = "Number should not be greater than 50.";
    } else if (!inputField.shopName) {
      error.er3 = "Required";
    } else if (!inputField.shopFloor) {
      error.er4 = "Required";
    } else if (inputField.shopFloor > 5) {
      error.er5 = "Shop has only 5 floors.";
    } else if (!inputField.shopOwnerName) {
      error.er6 = "Required";
    } else if (!inputField.shopType) {
      error.er7 = "Required";
    } else {
      const db = getDatabase(app);
      const newDocm = push(ref(db, "mall/shops"));
      set(newDocm, {
        shopNumber: inputField.shopNumber,
        shopName: inputField.shopName,
        shopFloor: inputField.shopFloor,
        shopOwnerName: inputField.shopOwnerName,
        shopType: inputField.shopType,
        shopOffer: [""],
      })
        .then(() => {
          alert("Data saved successfully");
          window.location.reload();
        })
        .catch((err) => {
          alert("Error: " + err.message);
        });
    }
    setError(error);
  };

  return (
    <div className="container">
      <h2 className="header">New Shop Detail</h2>
      <div className="grid grid-cols-11">
        <div className="border col-span-2">
          <AdminNavigation />
        </div>
        <div className="col-span-9 border">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="md:grid md:grid-cols-4 gap-8">
                <div className="input-group">
                  <label className="label" htmlFor="ShopNumber">Shop Number*</label>
                  <input
                    className="input"
                    type="number"
                    required
                    placeholder="Enter Shop Number"
                    id="ShopNumber"
                    name="ShopNumber"
                    value={inputField.shopNumber}
                    onChange={(e) =>
                      setInputField({
                        ...inputField,
                        shopNumber: e.target.value,
                      })
                    }
                  />
                  <div className="error">{error.er1}</div>
                  <div className="error">{error.er2}</div>
                </div>
                <div className="input-group">
                  <label className="label" htmlFor="ShopName">Shop Name*</label>
                  <input
                    className="input"
                    type="text"
                    required
                    placeholder="Enter Shop Name"
                    id="ShopName"
                    name="ShopName"
                    value={inputField.shopName}
                    onChange={(e) =>
                      setInputField({ ...inputField, shopName: e.target.value })
                    }
                  />
                  <div className="error">{error.er3}</div>
                </div>
                <div className="input-group">
                  <label className="label" htmlFor="ShopFloor">Shop Floor*</label>
                  <input
                    className="input"
                    type="number"
                    required
                    placeholder="Enter Mall Floor where shop is located"
                    id="ShopFloor"
                    name="ShopFloor"
                    value={inputField.shopFloor}
                    onChange={(e) =>
                      setInputField({
                        ...inputField,
                        shopFloor: e.target.value,
                      })
                    }
                  />
                  <div className="error">{error.er4}</div>
                  <div className="error">{error.er5}</div>
                </div>
                <div className="input-group">
                  <label className="label" htmlFor="ShopOwnerName">Shop Owner Name*</label>
                  <input
                    className="input"
                    type="text"
                    required
                    placeholder="Enter Shop Owner Name"
                    id="ShopOwnerName"
                    name="ShopOwnerName"
                    value={inputField.shopOwnerName}
                    onChange={(e) =>
                      setInputField({
                        ...inputField,
                        shopOwnerName: e.target.value,
                      })
                    }
                  />
                  <div className="error">{error.er6}</div>
                </div>
                <div className="input-group">
                  <label className="label" htmlFor="ShopType">Shop Type*</label>
                  <select
                    className="input"
                    onChange={(e) =>
                      setInputField({ ...inputField, shopType: e.target.value })
                    }
                  >
                    <option value="#">Select Category of shop</option>
                    <option value="tech">Technology</option>
                    <option value="veg">Vegetable</option>
                    <option value="fruit">Fruit</option>
                    <option value="cyber">Cyber Cafe</option>
                    <option value="chicken">Chicken shop</option>
                  </select>
                  <div className="error">{error.er7}</div>
                </div>
              </div>
              <div className="float-right m-4">
                <button className="submit-button" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateShop;
