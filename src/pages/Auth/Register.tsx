import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema, type RegisterSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerRequest } from "@/services/auth.service";
import { ArrowLeftIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
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
    setError,
    formState: { isSubmitting, errors },
  } = form;

  if (Object.keys(errors).length > 0) {
    console.log("Error", errors);
  }

  const onSubmit = async (values: RegisterSchema) => {
    try {
      const response = await registerRequest(values);

      if (response.user && response.token) {
        login(response.user, response.token);
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    } catch (e: any) {
      setError("email", {
        type: "manual",
        message: e.message ?? "No se pudo registrar",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-fit p-5 ">
      <div className="flex flex-col gap-4 w-full max-w-sm ">
        <h2 className="w-auto text-center py-2 text-2xl font-bold">
          Registrarse
        </h2>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrandose..." : "Registrarse"}
            </Button>
          </form>
        </Form>

        <Link to="/login" className="underline">
          <ArrowLeftIcon />
        </Link>
      </div>
    </div>
  );
}
