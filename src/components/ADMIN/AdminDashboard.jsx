import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import app from "../../firebase/firebaseconsole";
import AdminNavigation from "./AdminNavigation";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

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

  // Use useMemo to filter shops by floor
  const floor_1 = useMemo(() => data.filter(item => item.shopFloor === "1"), [data]);
  const floor_2 = useMemo(() => data.filter(item => item.shopFloor === "2"), [data]);
  const floor_3 = useMemo(() => data.filter(item => item.shopFloor === "3"), [data]);
  const floor_4 = useMemo(() => data.filter(item => item.shopFloor === "4"), [data]);
  const floor_5 = useMemo(() => data.filter(item => item.shopFloor === "5"), [data]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="grid grid-cols-11">
        <div className="border col-span-2">
          <AdminNavigation />
        </div>
        <div className="col-span-9 border">
          <div className="header">Shop Dashboard</div>
          <button 
            className="signup-button" 
            onClick={() => navigate('/admin_signup')} // Navigate to signup page
          >
            Admin Signup
          </button>
          {[floor_1, floor_2, floor_3, floor_4, floor_5].map((floor, index) => (
            <div className="floor-section" key={index}>
              <div className="floor-title">Floor {index + 1}:</div>
              <div className="shop-list">
                {floor.length > 0 ? (
                  floor.map((item, idx) => (
                    <div className="shop-item" key={idx}>
                      {item.shopNumber}
                    </div>
                  ))
                ) : (
                  <div className="no-shop">No any Shop</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
