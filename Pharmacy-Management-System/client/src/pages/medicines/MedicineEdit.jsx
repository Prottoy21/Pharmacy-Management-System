import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MedicineForm from "./MedicineForm";
import { getMedicine } from "../../features/medicine/medicineService";

const MedicineEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadMedicine = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMedicine(id);

        if (mounted) {
          setMedicine(data);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err.response?.data?.message ||
              "Failed to load medicine"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadMedicine();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">
          Loading medicine...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto bg-white border rounded-xl p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>

        <button
          type="button"
          onClick={() => navigate("/medicines")}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg"
        >
          Back to Medicines
        </button>
      </div>
    );
  }

  if (!medicine) {
    return null;
  }

  return (
    <MedicineForm
      medicine={medicine}
      editMode
    />
  );
};

export default MedicineEdit;