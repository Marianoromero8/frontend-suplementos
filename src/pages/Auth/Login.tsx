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
import { mockUsers } from "../../data/users.mock";

type LoginFormValues = {
  email: string;
  password: string;
};

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  // Si venís de una ruta protegida, volvés ahí. Si no, al dashboard admin.
  const from = location.state?.from?.pathname || "/dashboard";

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: LoginFormValues) => {
    const { email, password } = values;

    // Buscar usuario por email
    const found = mockUsers.find((u) => u.email === email);

    if (!found) {
      setError("password", {
        type: "manual",
        message: "Credenciales inválidas",
      });
      return;
    }

    // Ver si tiene contraseña reseteada en localStorage
    const overriddenPassword = localStorage.getItem(
      `resetPassword:${found.email}`
    );

    // Si hay contraseña override, usamos esa; si no, la del mock
    const isValid =
      (overriddenPassword && overriddenPassword === password) ||
      (!overriddenPassword && found.password === password);

    if (!isValid) {
      setError("password", {
        type: "manual",
        message: "Credenciales inválidas",
      });
      return;
    }

    // Armamos el User que espera el AuthContext (sin contraseña)
    const user = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
    };

    // Token falso por ahora
    const fakeToken = "mock-token-" + found.id;

    // Guardar en context + localStorage
    login(user, fakeToken);

    // Redirigir
    navigate(from, { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-fit p-5 ">
      <div className="flex flex-col gap-4 w-full max-w-sm ">
        <h2 className="w-auto text-center py-2 text-2xl font-bold">Login</h2>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* EMAIL */}
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
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* PASSWORD */}
            <FormField
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="*******"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ingresando..." : "Log In"}
            </Button>
          </form>
        </Form>

        {/* LINK A RECUPERO DE CONTRASEÑA */}
        <Link to="/forgot-password">
          <p className="underline cursor-pointer">
            ¿Olvidaste tu contraseña?
          </p>
        </Link>

        <Link to="/register">
          <p className="underline cursor-pointer">Register</p>
        </Link>
      </div>
    </div>
  );
}