import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";

import {
  setLoading,
  setMedicines,
  setPagination,
  setError,
} from "../../features/medicine/medicineSlice";

import {
  getMedicines,
  deleteMedicine,
} from "../../features/medicine/medicineService";

const MedicineList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    medicines,
    pagination,
    loading,
    error,
  } = useSelector((state) => state.medicine);

  const [search, setSearch] = useState("");

  const loadMedicines = useCallback(
    async (page = 1, searchValue = "") => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const response = await getMedicines({
          page,
          limit: 10,
          search: searchValue.trim(),
        });

        dispatch(setMedicines(response.data || []));

        dispatch(
          setPagination(
            response.pagination || {
              page,
              limit: 10,
              total: 0,
              pages: 0,
            }
          )
        );
      } catch (err) {
        dispatch(
          setError(
            err.response?.data?.message ||
              "Failed to load medicines"
          )
        );
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    loadMedicines(1, "");
  }, [loadMedicines]);

  const handleSearch = (e) => {
    e.preventDefault();

    loadMedicines(1, search);
  };

  const handleReset = () => {
    setSearch("");
    loadMedicines(1, "");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmed) return;

    try {
      await deleteMedicine(id);

      const currentPage =
        medicines.length === 1 && pagination.page > 1
          ? pagination.page - 1
          : pagination.page;

      await loadMedicines(currentPage, search);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete medicine"
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Medicines
          </h1>

          <p className="text-gray-500 mt-1">
            Manage pharmacy medicines and stock
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/medicines/add")}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg"
        >
          <Plus size={18} />
          Add Medicine
        </button>
      </div>

      {/* Error */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Search */}

      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search medicine, generic, brand, company or barcode..."
              className="w-full border rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg"
          >
            Search
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="border px-4 py-2.5 rounded-lg hover:bg-gray-50 flex items-center justify-center"
            title="Reset"
          >
            <RefreshCw size={18} />
          </button>
        </form>
      </div>

      {/* Table */}

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-5 py-4">
                  Medicine
                </th>

                <th className="text-left px-5 py-4">
                  Generic
                </th>

                <th className="text-left px-5 py-4">
                  Company
                </th>

                <th className="text-left px-5 py-4">
                  Batch
                </th>

                <th className="text-left px-5 py-4">
                  Stock
                </th>

                <th className="text-left px-5 py-4">
                  Selling Price
                </th>

                <th className="text-right px-5 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-12 text-gray-500"
                  >
                    Loading medicines...
                  </td>
                </tr>
              ) : medicines.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-12 text-gray-500"
                  >
                    No medicines found
                  </td>
                </tr>
              ) : (
                medicines.map((medicine) => (
                  <tr
                    key={medicine._id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium">
                        {medicine.medicineName}
                      </div>

                      <div className="text-sm text-gray-500">
                        {medicine.strength} ·{" "}
                        {medicine.dosageForm}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {medicine.genericName}
                    </td>

                    <td className="px-5 py-4">
                      {medicine.company}
                    </td>

                    <td className="px-5 py-4">
                      {medicine.batchNumber}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          medicine.quantity <= 10
                            ? "text-red-600 font-semibold"
                            : "text-green-600 font-semibold"
                        }
                      >
                        {medicine.quantity}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      ৳{Number(
                        medicine.sellingPrice || 0
                      ).toFixed(2)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/medicines/edit/${medicine._id}`
                            )
                          }
                          className="p-2 border rounded-lg hover:bg-blue-50 text-blue-600"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(medicine._id)
                          }
                          className="p-2 border rounded-lg hover:bg-red-50 text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-t p-4">
          <p className="text-sm text-gray-500">
            Total: {pagination.total}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={pagination.page <= 1 || loading}
              onClick={() =>
                loadMedicines(
                  pagination.page - 1,
                  search
                )
              }
              className="border px-3 py-2 rounded-lg disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-3 py-2 text-sm">
              {pagination.page} /{" "}
              {pagination.pages || 1}
            </span>

            <button
              type="button"
              disabled={
                loading ||
                pagination.pages === 0 ||
                pagination.page >= pagination.pages
              }
              onClick={() =>
                loadMedicines(
                  pagination.page + 1,
                  search
                )
              }
              className="border px-3 py-2 rounded-lg disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineList;