import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../../components/ui/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerSchema, type RegisterSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerRequest } from "@/services/auth.service";
import Swal from "sweetalert2";
interface UserFormProps {
  open: boolean;
  onClose: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function UserForm({ open, onClose }: UserFormProps) {
  const navigate = useNavigate();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: RegisterSchema) => {
    try {
      await registerRequest(values);
      reset({
        name: "",
        email: "",
        password: "",
        address: "",
      });
      await Swal.fire({
        title: `¡User ${values.name} was created!`,
        text: `The user "${values.name}" was created successfully`,
        icon: "success",
        confirmButtonColor: "#000",
        timer: 2000,
        timerProgressBar: true,
      });
      onClose(true);
      window.location.reload();
      navigate("/dashboard/users", { replace: true });
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message || "User wasn´t create",
        icon: "error",
      });
    }
  };
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] p-5">
        <SheetHeader>
          <SheetTitle>Crear Usuario</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Nombre" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@gmail.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*******" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Direccion</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="xxxxx xxxx 1234"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creando..." : "Crear"}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
