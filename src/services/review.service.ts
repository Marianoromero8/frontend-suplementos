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

export async function getReviewById(id: string): Promise<ReviewSchema> {
  const res = await fetch(`${API_URL}/api/reviews/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) throw new Error(`Error al obtener la review ${id}`);
  const data = await res.json();
  return reviewSchema.parse(data);
}

export async function getReviewsByProductId(
  productId: string,
): Promise<ReviewSchema[]> {
  const res = await fetch(`${API_URL}/api/reviews/product/${productId}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return reviewSchema.array().parse(data);
}

export async function createReview(
  newReview: Omit<ReviewSchema, "review_id" | "createdAt" | "updatedAt">,
): Promise<ReviewSchema> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newReview),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Detalle del error 422:", errorData);
    throw new Error(errorData.message || "Error al crear la reseña");
  }

  const data = await res.json();
  return reviewSchema.parse(data);
}

export async function deleteReview(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/reviews/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) throw new Error("Error al eliminar la review");
}
