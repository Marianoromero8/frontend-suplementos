import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "@/schemas/user.schema";
import { getUsers } from "@/services/user.service";

type ForgotFormValues = {
  email: string;
};

export function ForgotPassword() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const form = useForm<ForgotFormValues>({
    defaultValues: { email: "" },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const navigate = useNavigate();

  const onSubmit = (values: ForgotFormValues) => {
    const { email } = values;

    const user = users.find((u) => u.email === email);

    if (!user) {
      setError("email", {
        type: "manual",
        message: "No existe un usuario con ese email",
      });
      return;
    }

    // En un backend real acá llamarías a /auth/forgot-password
    // Por ahora, lo mandamos a resetear contraseña directamente
    navigate(`/reset-password/${encodeURIComponent(user.email)}`);
  };

  return (
    <div className="flex items-center justify-center min-h-fit p-5 ">
      <div className="flex flex-col gap-4 w-full max-w-sm ">
        <h2 className="w-auto text-center py-2 text-2xl font-bold">
          Recuperar contraseña
        </h2>

        <p className="text-sm text-[#30292F]">
          Ingresá tu correo y te ayudaremos a restablecer tu contraseña.
        </p>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@gmail.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-[#d11f1f] text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Procesando..." : "Continuar"}
            </Button>
          </form>
        </Form>

        <Link to="/login" className="underline text-sm">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
