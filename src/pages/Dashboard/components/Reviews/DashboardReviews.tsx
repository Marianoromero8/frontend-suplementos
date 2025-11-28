import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { StarIcon, Trash } from "lucide-react";
import { mockReviews } from "@/data/reviews.mock";
import { useState } from "react";
import { mockProducts } from "@/data/products.mock";
import { mockUsers } from "@/data/users.mock";

export function DashboardReviews() {
  const reviews = mockReviews;
  const products = mockProducts;
  const users = mockUsers;
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const reviewsPagination = reviews.slice(
    (page - 1) * pageSize,
    page * pageSize
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
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewsPagination.map((rev) => {
              const product = products.find(
                (prod) => prod.product_id === rev.product_id
              );
              const user = users.find((user) => user.id === rev.user_id);
              return (
                <TableRow key={rev.user_id}>
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
                  <TableCell>
                    <Button variant="destructive" className="cursor-pointer">
                      <Trash />
                    </Button>
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
