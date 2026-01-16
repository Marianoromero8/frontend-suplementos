import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Edit2Icon, MoreVertical, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import type { CategorySchema } from "@/schemas/category.schema";
import { getCategories } from "@/services/categories.service";

export function DashboardCategories() {
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<CategorySchema[]>([]);
  const pageSize = 10;

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const categoriesPagination = categories.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoriesPagination.map((cat) => (
              <TableRow key={cat.category_id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.description}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost">
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Edit2Icon /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        page={page}
        pageSize={pageSize}
        total={categories.length}
        onChange={setPage}
      />
    </div>
  );
}
