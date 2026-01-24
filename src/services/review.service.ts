import { reviewSchema, type ReviewSchema } from "@/schemas/review.schema";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function getReviews(): Promise<ReviewSchema[]> {
  const res = await fetch(`${API_URL}/api/reviews`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener reviews");
  }
  console.log(res);
  const data = await res.json();
  return reviewSchema.array().parse(data);
}
