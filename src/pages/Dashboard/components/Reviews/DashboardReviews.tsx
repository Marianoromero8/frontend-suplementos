import { Pagination } from "@/components/Pagination";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReviewSchema } from "@/schemas/review.schema";
import type { ProductSchema } from "@/schemas/product.schema";
import { getReviews } from "@/services/review.service";
import { getProducts } from "@/services/product.service";
import { getUsers } from "@/services/user.service";
import type { User } from "@/schemas/user.schema";

export function DashboardReviews() {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<ReviewSchema[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<ProductSchema[]>([]);
  const pageSize = 10;

  useEffect(() => {
    getReviews().then(setReviews);
    getProducts().then(setProducts);
    getUsers().then(setUsers);
  }, []);
  const reviewsPagination = reviews.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reviews</h1>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewsPagination.map((rev) => {
              const product = products.find(
                (prod) => Number(prod.product_id) === Number(rev.product_id),
              );
              const user = users.find(
                (user) => Number(user.user_id) === Number(rev.user_id),
              );
              return (
                <TableRow key={rev.review_id}>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{rev.comment}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{user?.name}</span>
                      <span className="text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="flex flex-row items-center gap-2 ">
                    <StarIcon className="text-[#fcf811fa] fill-[#fcf811fa]" />
                    {rev.qualification}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Pagination
        page={page}
        pageSize={pageSize}
        total={reviews.length}
        onChange={setPage}
      />
    </div>
  );
}
