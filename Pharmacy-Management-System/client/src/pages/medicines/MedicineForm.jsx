import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import {
  createMedicine,
  updateMedicine,
} from "../../features/medicine/medicineService";

const medicineSchema = z
  .object({
    medicineName: z
      .string()
      .trim()
      .min(2, "Medicine name is required"),

    genericName: z
      .string()
      .trim()
      .min(2, "Generic name is required"),

    brand: z
      .string()
      .trim()
      .min(2, "Brand is required"),

    company: z
      .string()
      .trim()
      .min(2, "Company is required"),

    category: z
      .string()
      .trim()
      .min(1, "Category is required"),

    strength: z
      .string()
      .trim()
      .min(1, "Strength is required"),

    dosageForm: z
      .string()
      .min(1, "Dosage form is required"),

    barcode: z
      .string()
      .trim()
      .min(1, "Barcode is required"),

    batchNumber: z
      .string()
      .trim()
      .min(1, "Batch number is required"),

    purchasePrice: z.coerce
      .number()
      .min(0, "Purchase price cannot be negative"),

    sellingPrice: z.coerce
      .number()
      .min(0, "Selling price cannot be negative"),

    quantity: z.coerce
      .number()
      .int("Quantity must be a whole number")
      .min(0, "Quantity cannot be negative"),

    manufacturingDate: z
      .string()
      .min(1, "Manufacturing date is required"),

    expiryDate: z
      .string()
      .min(1, "Expiry date is required"),

    supplier: z
      .string()
      .trim()
      .min(1, "Supplier is required"),

    image: z.string().optional(),

    description: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.manufacturingDate ||
      !data.expiryDate ||
      data.expiryDate > data.manufacturingDate,
    {
      message: "Expiry date must be after manufacturing date",
      path: ["expiryDate"],
    }
  );

const defaultValues = {
  medicineName: "",
  genericName: "",
  brand: "",
  company: "",
  category: "",
  strength: "",
  dosageForm: "",
  barcode: "",
  batchNumber: "",
  purchasePrice: 0,
  sellingPrice: 0,
  quantity: 0,
  manufacturingDate: "",
  expiryDate: "",
  supplier: "",
  image: "",
  description: "",
};

const MedicineForm = ({ medicine = null, editMode = false }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(medicineSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!medicine) return;

    reset({
      medicineName: medicine.medicineName ?? "",
      genericName: medicine.genericName ?? "",
      brand: medicine.brand ?? "",
      company: medicine.company ?? "",
      category: medicine.category ?? "",
      strength: medicine.strength ?? "",
      dosageForm: medicine.dosageForm ?? "",
      barcode: medicine.barcode ?? "",
      batchNumber: medicine.batchNumber ?? "",
      purchasePrice: medicine.purchasePrice ?? 0,
      sellingPrice: medicine.sellingPrice ?? 0,
      quantity: medicine.quantity ?? 0,
      manufacturingDate: medicine.manufacturingDate
        ? String(medicine.manufacturingDate).slice(0, 10)
        : "",
      expiryDate: medicine.expiryDate
        ? String(medicine.expiryDate).slice(0, 10)
        : "",
      supplier: medicine.supplier ?? "",
      image: medicine.image ?? "",
      description: medicine.description ?? "",
    });
  }, [medicine, reset]);

  const onSubmit = async (data) => {
    try {
      if (editMode && medicine?._id) {
        await updateMedicine(medicine._id, data);
      } else {
        await createMedicine(data);
      }

      navigate("/medicines");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          `Failed to ${
            editMode ? "update" : "create"
          } medicine`
      );
    }
  };

  const inputClass =
    "w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500";

  const labelClass =
    "block text-sm font-medium text-gray-700 mb-1";

  const errorClass =
    "text-red-500 text-sm mt-1";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/medicines")}
          className="p-2 border rounded-lg hover:bg-gray-50"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            {editMode ? "Edit Medicine" : "Add Medicine"}
          </h1>

          <p className="text-gray-500 mt-1">
            {editMode
              ? "Update medicine and stock information"
              : "Add a new medicine to your inventory"}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border rounded-xl shadow-sm p-6 space-y-8"
      >
        {/* Basic Information */}

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                Medicine Name
              </label>

              <input
                {...register("medicineName")}
                className={inputClass}
                placeholder="Napa"
              />

              {errors.medicineName && (
                <p className={errorClass}>
                  {errors.medicineName.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Generic Name
              </label>

              <input
                {...register("genericName")}
                className={inputClass}
                placeholder="Paracetamol"
              />

              {errors.genericName && (
                <p className={errorClass}>
                  {errors.genericName.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Brand
              </label>

              <input
                {...register("brand")}
                className={inputClass}
                placeholder="Napa"
              />

              {errors.brand && (
                <p className={errorClass}>
                  {errors.brand.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Company
              </label>

              <input
                {...register("company")}
                className={inputClass}
                placeholder="Beximco"
              />

              {errors.company && (
                <p className={errorClass}>
                  {errors.company.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Category
              </label>

              <input
                {...register("category")}
                className={inputClass}
                placeholder="Analgesic"
              />

              {errors.category && (
                <p className={errorClass}>
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Strength
              </label>

              <input
                {...register("strength")}
                className={inputClass}
                placeholder="500 mg"
              />

              {errors.strength && (
                <p className={errorClass}>
                  {errors.strength.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Dosage Form
              </label>

              <select
                {...register("dosageForm")}
                className={inputClass}
              >
                <option value="">
                  Select dosage form
                </option>
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Injection">Injection</option>
                <option value="Cream">Cream</option>
                <option value="Ointment">Ointment</option>
                <option value="Drops">Drops</option>
                <option value="Suspension">
                  Suspension
                </option>
              </select>

              {errors.dosageForm && (
                <p className={errorClass}>
                  {errors.dosageForm.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Barcode
              </label>

              <input
                {...register("barcode")}
                className={inputClass}
                placeholder="8901234567890"
              />

              {errors.barcode && (
                <p className={errorClass}>
                  {errors.barcode.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Batch & Stock */}

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Batch & Stock
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className={labelClass}>
                Batch Number
              </label>

              <input
                {...register("batchNumber")}
                className={inputClass}
                placeholder="BATCH-001"
              />

              {errors.batchNumber && (
                <p className={errorClass}>
                  {errors.batchNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Purchase Price
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                {...register("purchasePrice")}
                className={inputClass}
              />

              {errors.purchasePrice && (
                <p className={errorClass}>
                  {errors.purchasePrice.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Selling Price
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                {...register("sellingPrice")}
                className={inputClass}
              />

              {errors.sellingPrice && (
                <p className={errorClass}>
                  {errors.sellingPrice.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Quantity
              </label>

              <input
                type="number"
                min="0"
                {...register("quantity")}
                className={inputClass}
              />

              {errors.quantity && (
                <p className={errorClass}>
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Manufacturing Date
              </label>

              <input
                type="date"
                {...register("manufacturingDate")}
                className={inputClass}
              />

              {errors.manufacturingDate && (
                <p className={errorClass}>
                  {errors.manufacturingDate.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Expiry Date
              </label>

              <input
                type="date"
                {...register("expiryDate")}
                className={inputClass}
              />

              {errors.expiryDate && (
                <p className={errorClass}>
                  {errors.expiryDate.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Supplier */}

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Supplier
          </h2>

          <label className={labelClass}>
            Supplier Name
          </label>

          <input
            {...register("supplier")}
            className={inputClass}
            placeholder="Supplier name"
          />

          {errors.supplier && (
            <p className={errorClass}>
              {errors.supplier.message}
            </p>
          )}
        </section>

        {/* Additional Information */}

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Additional Information
          </h2>

          <label className={labelClass}>
            Image URL
          </label>

          <input
            {...register("image")}
            className={`${inputClass} mb-4`}
            placeholder="https://example.com/medicine.jpg"
          />

          <label className={labelClass}>
            Description
          </label>

          <textarea
            {...register("description")}
            rows={4}
            className={inputClass}
            placeholder="Medicine description..."
          />
        </section>

        {/* Buttons */}

        <div className="flex justify-end gap-3 border-t pt-6">
          <button
            type="button"
            onClick={() => navigate("/medicines")}
            className="px-5 py-2.5 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
          >
            {isSubmitting
              ? editMode
                ? "Updating..."
                : "Saving..."
              : editMode
              ? "Update Medicine"
              : "Save Medicine"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicineForm;