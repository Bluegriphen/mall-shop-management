import { get, getDatabase, ref, remove } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import app from "../../firebase/firebaseconsole";
import { NavLink, useNavigate } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";
import { DownloadTableExcel } from "react-export-table-to-excel";
import './AdminListAllShop.css'; // Import the CSS file

const AdminListAllShop = () => {
  const [data, setData] = useState([]);
  const [shopKey, setShopKey] = useState("");
  const nav = useNavigate();
  const [initial, setInitial] = useState(0);
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

  const handleDeleteShop = async (id) => {
    const db = getDatabase(app);
    const dataRef = ref(db, "mall/shops");
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[id];
      setShopKey(key);
      if (key) {
        const shopRef = ref(db, `mall/shops/${key}`);
        remove(shopRef)
          .then(() => {
            alert("Shop deleted successfully!");
            window.location.reload();
          })
          .catch((error) => {
            alert("Error deleting shop:", error);
          });
      } else {
        alert("No shop selected for deletion.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2>All Shops</h2>
      </div>

      <div className="grid grid-cols-11">
        <div className="border col-span-2">
          <AdminNavigation />
        </div>
        <div className="col-span-9 border">
          <div className="table-container">
            <DownloadTableExcel
              filename="shops_table"
              currentTableRef={tableRef.current}
            >
              <button className="export-button">Export to Excel</button>
            </DownloadTableExcel>
            <table ref={tableRef} className="table">
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Shop Name</th>
                  <th>Shop Owner Name</th>
                  <th>Shop Number</th>
                  <th>Mall Floor</th>
                  <th>Shop Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.shopName}</td>
                    <td>{item.shopOwnerName}</td>
                    <td>{item.shopNumber}</td>
                    <td>{item.shopFloor}</td>
                    <td>{item.shopType}</td>
                    <td>
                      <NavLink
                        to={`/admin/view/${index}`}
                        className="button button-view"
                      >
                        View
                      </NavLink>
                      <button
                        onClick={() => handleDeleteShop(index)}
                        className="button button-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            {initial > 0 && (
              <button onClick={() => setInitial(initial - 5)}>Previous</button>
            )}
            {initial < data.length && (
              <button onClick={() => setInitial(initial + 5)}>Next</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminListAllShop;
