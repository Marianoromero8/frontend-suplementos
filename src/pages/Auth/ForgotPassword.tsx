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
import { forgotPasswordRequest } from "@/services/auth.service";
import Swal from "sweetalert2";
import {
  ArrowBigLeft,
  ArrowBigLeftDash,
  ArrowBigLeftIcon,
  ArrowLeftIcon,
  BackpackIcon,
} from "lucide-react";

type ForgotFormValues = {
  email: string;
};

export function ForgotPassword() {
  const navigate = useNavigate();

  const form = useForm<ForgotFormValues>({
    defaultValues: { email: "" },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ForgotFormValues) => {
    try {
      await forgotPasswordRequest(values.email);

      await Swal.fire({
        title: "¡Correo Enviado!",
        text: `Se enviaron instrucciones a su correo electrónico`,
        icon: "success",
        confirmButtonColor: "#000",
        timer: 2000,
        timerProgressBar: true,
      });

      navigate("/login");
    } catch (error: any) {
      setError("email", {
        type: "manual",
        message: error.message,
      });

      Swal.fire({
        title: "Error",
        text: error.message || "Ocurrió un problema inesperado",
        icon: "error",
        confirmButtonColor: "#000",
      });
    }
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
          <ArrowLeftIcon />
        </Link>
      </div>
    </div>
  );
}
