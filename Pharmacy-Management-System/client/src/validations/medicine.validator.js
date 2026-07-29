import { z } from "zod";

export const medicineSchema = z.object({
  medicineName: z.string().min(2),

  genericName: z.string().min(2),

  brand: z.string().min(2),

  company: z.string().min(2),

  category: z.string(),

  strength: z.string(),

  dosageForm: z.string(),

  barcode: z.string(),

  batchNumber: z.string(),

  purchasePrice: z.number(),

  sellingPrice: z.number(),

  quantity: z.number(),

  manufacturingDate: z.string(),

  expiryDate: z.string(),

  supplier: z.string(),

  image: z.string().optional(),

  description: z.string().optional(),
});