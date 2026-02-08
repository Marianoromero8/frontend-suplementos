import { Button } from "@/components/ui/button";
import type { ProductSchema } from "@/schemas/product.schema";
import { getProductById } from "@/services/product.service";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeftIcon, ShoppingBasket, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ReviewSchema } from "@/schemas/review.schema";
import { useAuth } from "@/contexts/AuthContext";
import { createReview, getReviewsByProductId } from "@/services/review.service";
import Swal from "sweetalert2";

export function Productdetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState<ProductSchema | null>(null);
  const [reviews, setReviews] = useState<ReviewSchema[]>([]);
  const [comment, setComment] = useState("");
  const [qualification, setQualification] = useState("5");
  const hasReviewed = reviews.some((r) => r.user_id === user?.id);

  useEffect(() => {
    try {
      if (!id) return;
      getProductById(Number(id)).then((data) => setProduct(data));
      getReviewsByProductId(id).then(setReviews);
    } catch (error) {
      throw new Error(`Information of product not found, ${error}`);
    }
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !id || !user) return;

    Swal.fire({
      title: "Publicando...",
      text: "Estamos subiendo tu opinion",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const newReview = await createReview({
        user_id: Number(user.id),
        product_id: Number(id),
        qualification: Number(qualification),
        comment: comment,
        date: new Date().toISOString(),
      });

      Swal.fire({
        icon: "success",
        title: "¡Gracias!",
        text: "Tu reseña se ha publicado correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });

      setReviews((prev) => [...prev, newReview]);
      setComment("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema al guardar tu reseña. Intentalo más tarde.",
      });
      console.error(error);
    }
  };

  return (
    <section className="space-y-2 flex flex-col items-center">
      <h1 className="text-5xl font-semibold">
        {product?.name} #{product?.product_id}
      </h1>
      <div className="text-xl flex flex-col justify-center items-center gap-5 p-5">
        <h2 className="text-3xl flex justify-center">{product?.brand}</h2>
        <img src={product?.image} alt="" className="w-72 h-96" />
        <p>{product?.description}</p>
        <div className="flex flex-row gap-2 items-center">
          <p className="font-bold">${product?.price}</p>
          <Star className="text-[#fae843] fill-[#fae843]" />
          <p>{product?.rating}</p>
        </div>
        <Button
          className="w-fit"
          onClick={() => product && addToCart(product, 1)}
          disabled={!product || product.stock === 0}
        >
          <ShoppingBasket />
        </Button>
      </div>

      <hr className="w-full max-w-2xl border-[#555]" />

      <div className="w-full max-w-2xl space-y-6">
        <h3 className="text-2xl font-bold italic">Opiniones de la comunidad</h3>

        {user && !hasReviewed ? (
          <form
            onSubmit={handleSubmitReview}
            className="border p-6 rounded-lg bg-[#b3acac] shadow-sm"
          >
            <h4 className="font-medium mb-4 text-center">
              Contanos tu experiencia
            </h4>
            <div className="space-y-3">
              <div className="flex flex-col items-center gap-2 mb-2">
                <label className="text-sm text-[#555]">
                  Calificacion (1 al 5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  className="p-2 border rounded w-24 text-center font-bold"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                />
              </div>
              <textarea
                className="w-full p-2 border rounded h-24 shadow-inner"
                placeholder="Escribe aquí tu comentario..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="w-full bg-black text-[#ffff] hover:bg-[#333232]"
              >
                Enviar Reseña
              </Button>
            </div>
          </form>
        ) : user && hasReviewed ? (
          <div className="p-4 bg-green-50 text-green-700 rounded-md border border-green-200 text-center font-medium">
            ¡Ya has compartido tu opinion sobre este producto!
          </div>
        ) : (
          <div className="p-4 bg-[#dfdddd] text-[#1a1b20] rounded-md text-center">
            Inicia sesion para dejar una opinion.
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.review_id}
                className="p-4 bg-[#ffff] border rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex text-[#e6d226] mb-2">
                    {Array.from({ length: Number(review.qualification) }).map(
                      (_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ),
                    )}
                  </div>
                  <span className="text-[10px] text-[#686767]">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[#414040] text-sm leading-relaxed">
                  {review.comment}
                </p>
                <p className="text-[10px] text-[#636363] mt-2">
                  Usuario: {review.user_id}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-[#0e0d0d] italic">
              No hay reseñas todavia
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-10">
        <Link
          to="/"
          className="text-black hover:text-[#25252555] flex items-center gap-1 transition-colors"
        >
          <ArrowLeftIcon size={16} /> Volver a la tienda
        </Link>
      </div>
    </section>
  );
}
