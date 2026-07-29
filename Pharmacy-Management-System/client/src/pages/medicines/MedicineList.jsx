import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMedicines } from "../../features/medicine/medicineService";
import { setMedicines } from "../../features/medicine/medicineSlice";

const MedicineList = () => {
  const dispatch = useDispatch();

  const medicines = useSelector(
    (state) => state.medicine.medicines
  );

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    const data = await getMedicines();

    dispatch(setMedicines(data));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Medicines
        </h2>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Medicine
        </button>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th>Name</th>

            <th>Company</th>

            <th>Generic</th>

            <th>Stock</th>

            <th>Price</th>

            <th>Expiry</th>

          </tr>

        </thead>

        <tbody>

          {medicines.map((medicine) => (

            <tr
              key={medicine._id}
              className="border-b hover:bg-gray-50"
            >

              <td className="py-3">
                {medicine.medicineName}
              </td>

              <td>{medicine.company}</td>

              <td>{medicine.genericName}</td>

              <td>{medicine.quantity}</td>

              <td>{medicine.sellingPrice}</td>

              <td>
                {new Date(
                  medicine.expiryDate
                ).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default MedicineList;