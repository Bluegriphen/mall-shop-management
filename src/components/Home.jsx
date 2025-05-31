import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase/firebaseconsole";
import "./Home.css";

const Home = () => {
  const [inputField, setInputField] = useState("");
  const [mainCategoriesData, setMainCategoriesData] = useState([]);
  const [data, setData] = useState([]);
  const [offer, setOffer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dataRef = ref(db, "mall/shops");
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setData(Object.values(snapshot.val()));
      } else {
        alert("Data not found");
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    const filtered = data.filter((item) => item.shopType === inputField);
    setMainCategoriesData(filtered);
    setOffer([]); // clear offer view when switching category
  };

  const handleOfferProduct = () => {
    setOffer(data);
    setMainCategoriesData([]); // clear table view when switching to offers
  };

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="w-full md:w-auto border border-gray-300 rounded px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setInputField(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Select Category of Shop</option>
          <option value="tech">Technology</option>
          <option value="veg">Vegetable</option>
          <option value="fruit">Fruit</option>
          <option value="cyber">Cyber Cafe</option>
          <option value="chicken">Chicken Shop</option>
        </select>

        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600 transition"
        >
          Submit
        </button>

        <button
          onClick={handleOfferProduct}
          className="bg-green-500 text-white px-6 py-2 rounded shadow-md hover:bg-green-600 transition"
        >
          List Offer Products
        </button>
      </div>

      {/* Display Table or Offers */}
      <div className="bg-white p-4 rounded shadow">
        {mainCategoriesData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-200">
                <tr>
                  <th className="px-4 py-2">S No.</th>
                  <th className="px-4 py-2">Shop Name</th>
                  <th className="px-4 py-2">Owner Name</th>
                  <th className="px-4 py-2">Shop Number</th>
                  <th className="px-4 py-2">Mall Floor</th>
                  <th className="px-4 py-2">Shop Type</th>
                </tr>
              </thead>
              <tbody>
                {mainCategoriesData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2">{item.shopName}</td>
                    <td className="px-4 py-2">{item.shopOwnerName}</td>
                    <td className="px-4 py-2">{item.shopNumber}</td>
                    <td className="px-4 py-2">{item.shopFloor}</td>
                    <td className="px-4 py-2 capitalize">{item.shopType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : offer.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offer.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {item.shopName} — {item.shopType}
                </h2>
                <p className="text-sm text-gray-600 mb-1">Floor: {item.shopFloor}</p>
                <p className="text-sm text-gray-600 mb-3">Owner: {item.shopOwnerName}</p>

                <div>
                  <strong>Offers:</strong>
                  {typeof item.shopOffer === "string" ? (
                    <p className="text-red-500">No offer available</p>
                  ) : (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                      {item.shopOffer.map((offerItem, i) => (
                        <li key={i}>
                          <strong>{offerItem.offerName}</strong><br />
                          <span>{offerItem.offerDiscription}</span><br />
                          <span>Released: {offerItem.offerReleaseDate}</span><br />
                          <span>Expires: {offerItem.offerExpier}</span><br />
                          <span>Price: ₹{offerItem.offerOriginalPrice} → <span className="text-green-600 font-bold">₹{offerItem.offerDiscountPrice}</span></span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No categories or offers to display. Please select a category or list offers.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
