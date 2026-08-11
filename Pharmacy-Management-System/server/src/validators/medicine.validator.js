import { z } from "zod";

export const createMedicineSchema = z.object({
  medicineName: z.string().min(2),
  genericName: z.string().min(2),
  brand: z.string().min(2),
  company: z.string().min(2),
  category: z.string().min(1),
  strength: z.string().min(1),
  dosageForm: z.string().min(1),
  barcode: z.string().min(1),
  batchNumber: z.string().min(1),

  purchasePrice: z.coerce.number().min(0),
  sellingPrice: z.coerce.number().min(0),
  quantity: z.coerce.number().min(0),

  manufacturingDate: z.coerce.date(),
  expiryDate: z.coerce.date(),

  supplier: z.string().min(1),

  image: z.string().optional(),
  description: z.string().optional(),
});

export const updateMedicineSchema =
  createMedicineSchema.partial();