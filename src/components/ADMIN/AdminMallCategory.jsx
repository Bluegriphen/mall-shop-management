import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import app from "../../firebase/firebaseconsole";
import AdminNavigation from "./AdminNavigation";
import { DownloadTableExcel } from "react-export-table-to-excel";
import './AdminMallCategory.css'; 

const AdminMallCategory = () => {
  const [data, setData] = useState([]);
  const [inputField, setInputField] = useState("");
  const [mainData, setMainData] = useState([]);
  const [initial, setInitial] = useState(0);
  const [toggle, setToggle] = useState(false);
  const tableRef = useRef(null);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, "mall/shops");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      setData(Object.values(snapshot.val()));
    } else {
      alert("Data is not found");
    }
  };

  const handleClick = () => {
    setToggle(true);
    const category_filter_data = data.filter(
      (item) => item.shopType === inputField
    );
    setMainData(category_filter_data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2>Category Wise</h2>
      </div>
      <div className="grid grid-cols-11">
        <div className="border col-span-2">
          <AdminNavigation />
        </div>
        <div className="border col-span-9">
          <label htmlFor="category" className="category-select">Choose Category</label>
          <select
            className="select-category"
            onChange={(e) => setInputField(e.target.value)}
          >
            <option value="#">Select Category of Shop</option>
            <option value="tech">Technology</option>
            <option value="veg">Vegetable</option>
            <option value="fruit">Fruit</option>
            <option value="cyber">Cyber Cafe</option>
            <option value="chicken">Chicken Shop</option>
          </select>
          <div>
            <button className="submit-button" onClick={handleClick}>Submit</button>
          </div>

          <div className="table-container">
            {toggle && (
              <DownloadTableExcel
                filename="shops_table"
                currentTableRef={tableRef.current}
              >
                <button className="export-button">Export Excel</button>
              </DownloadTableExcel>
            )}
            <table
              ref={tableRef}
              className="table"
            >
              <thead>
                <tr>
                  <th scope="col">S No.</th>
                  <th scope="col">Shop Name</th>
                  <th scope="col">Shop Owner Name</th>
                  <th scope="col">Shop Number</th>
                  <th scope="col">Mall Floor</th>
                  <th scope="col">Shop Type</th>
                </tr>
              </thead>
              <tbody>
                {mainData.length > 0 ? (
                  mainData.slice(initial, initial + 5).map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>{item.shopName}</td>
                      <td>{item.shopOwnerName}</td>
                      <td>{item.shopNumber}</td>
                      <td>{item.shopFloor}</td>
                      <td>{item.shopType}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">Data Not Available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {initial > 0 && (
            <button onClick={() => setInitial(initial - 5)}>Previous</button>
          )}
          {initial < mainData.length && (
            <button onClick={() => setInitial(initial + 5)}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMallCategory;
