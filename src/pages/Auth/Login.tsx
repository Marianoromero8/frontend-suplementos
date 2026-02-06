import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { HomeIcon } from "lucide-react";
import { loginRequest } from "@/services/auth.service";

type LoginFormValues = {
  name: string;
  password: string;
};

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const form = useForm<LoginFormValues>({
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async ({ name, password }: LoginFormValues) => {
    try {
      const { token, user } = await loginRequest(name, password);

      login(
        {
          id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role as "USER" | "ADMIN",
        },
        token,
      );
      const from =
        location.state?.from?.pathname ??
        (user.role === "ADMIN" ? "/dashboard" : "/");

      navigate(from, { replace: true });
    } catch (e: any) {
      setError("password", {
        type: "manual",
        message: e.message ?? "Credenciales inválidas",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-fit p-5 ">
      <div className="flex flex-col gap-4 w-full max-w-sm ">
        <h2 className="w-auto text-center py-2 text-2xl font-bold">
          Iniciar Sesion
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
                    <Input
                      type="name"
                      placeholder="name"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Constraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="*******"
                      autoComplete="current-password"
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
              {isSubmitting ? "Cargando..." : "Iniciar Sesion"}
            </Button>
          </form>
        </Form>

        <Link to="/forgot-password">
          <p className="underline cursor-pointer">¿Olvidaste tu contraseña?</p>
        </Link>

        <Link to="/register">
          <p className="underline cursor-pointer">Registrarse</p>
        </Link>
      </div>
      <Link to="/">
        <HomeIcon />
      </Link>
    </div>
  );
}
