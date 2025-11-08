// import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { useAuth } from "../../contexts/AuthContext";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

export function Login() {
  const { login } = useAuth();
  const form = useForm();
  // const navigate = useNavigate();
  // const location = useLocation() as any;
  // const from = location.state?.from?.pathname || "/";
  return (
    <div className="flex items-center justify-center min-h-fit p-5 ">
      <div className="flex flex-col gap-4 w-full max-w-sm ">
        <h2 className="w-auto text-center py-2 text-2xl font-bold">
          Iniciar Sesión
        </h2>
        <Form {...form}>
          <FormField
            control={form.control}
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
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>

        <Button type="submit" className="cursor-pointer">
          LogIn
        </Button>
        <p className="underline cursor-pointer">¿Olvidaste tu contraseña?</p>
        <Link to="/register">
          <p className="underline cursor-pointer">Registrarse</p>
        </Link>
      </div>
    </div>
  );
}
