import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import {
  setLoading,
  setCategories,
  setError,
  addCategory,
  updateCategoryState,
  removeCategory,
} from "../../features/category/categorySlice";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../features/category/categoryService";

const CategoryList = () => {
  const dispatch = useDispatch();

  const {
    categories,
    loading,
    error,
  } = useSelector((state) => state.category);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const loadCategories = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await getCategories();

      dispatch(setCategories(response.data || []));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to load categories"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const response = await updateCategory(
          editingId,
          formData
        );

        dispatch(
          updateCategoryState(response.data)
        );
      } else {
        const response = await createCategory(formData);

        dispatch(addCategory(response.data));
      }

      resetForm();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save category"
      );
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);

    setFormData({
      name: category.name || "",
      description: category.description || "",
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      await deleteCategory(id);

      dispatch(removeCategory(id));
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete category"
      );
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="mt-1 text-gray-500">
            Manage medicine categories
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingId(null);

            setFormData({
              name: "",
              description: "",
            });

            setShowForm(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700"
        >
          <Plus size={18} />

          Add Category
        </button>

      </div>

      {/* Form */}

      {showForm && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              {editingId
                ? "Edit Category"
                : "Add Category"}
            </h2>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <X size={20} />
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div>
              <label className="mb-1 block font-medium">
                Category Name
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Antibiotic"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">
                Description
              </label>

              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                rows="3"
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Category description"
              />
            </div>

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border px-5 py-2.5"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
              >
                {editingId
                  ? "Update Category"
                  : "Create Category"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* Error */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Table */}

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="border-b bg-slate-50">

              <tr>

                <th className="px-5 py-4 text-left">
                  Category
                </th>

                <th className="px-5 py-4 text-left">
                  Description
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>

                <th className="px-5 py-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-12 text-center"
                  >
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-12 text-center text-gray-500"
                  >
                    No categories found
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr
                    key={category._id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="px-5 py-4 font-medium">
                      {category.name}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {category.description || "—"}
                    </td>

                    <td className="px-5 py-4">

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Active
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(category)
                          }
                          className="rounded-lg border p-2 hover:bg-blue-50"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(category._id)
                          }
                          className="rounded-lg border p-2 text-red-600 hover:bg-red-50"
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

      </div>

    </div>
  );
};

export default CategoryList;