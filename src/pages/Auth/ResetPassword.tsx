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
import { useNavigate, useParams, Link } from "react-router-dom";

type ResetFormValues = {
    password: string;
    confirmPassword: string;
};

export function ResetPassword() {
    const { email } = useParams<{ email: string }>();
    const navigate = useNavigate();

  const decodedEmail = email ? decodeURIComponent(email) : "";

  const form = useForm<ResetFormValues>({
    defaultValues: { password: "", confirmPassword: "" },
  });

    const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
    } = form;

    const onSubmit = (values: ResetFormValues) => {
    const { password, confirmPassword } = values;

    if (password.length < 6) {
        setError("password", {
        type: "manual",
        message: "La contraseña debe tener al menos 6 caracteres",
        });
        return;
    }

    if (password !== confirmPassword) {
        setError("confirmPassword", {
        type: "manual",
        message: "Las contraseñas no coinciden",
        });
        return;
    }

    if (!decodedEmail) {
        alert("Enlace inválido");
        return;
    }

    //la nueva contraseña se guarda en localStorage mientras solo tengamos el front
    localStorage.setItem(`resetPassword:${decodedEmail}`, password);

    alert(
        "Contraseña actualizada correctamente. Iniciá sesión con la nueva contraseña."
    );
    navigate("/login");
  };

    return (
    <div className="flex items-center justify-center min-h-fit p-5 ">
        <div className="flex flex-col gap-4 w-full max-w-sm ">
        <h2 className="w-auto text-center py-2 text-2xl font-bold">
            Nueva contraseña
        </h2>

        <p className="text-sm text-muted-foreground">
            Estás cambiando la contraseña de:{" "}
            <span className="font-semibold">{decodedEmail}</span>
        </p>

        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                    <Input
                        type="password"
                        placeholder="*******"
                        autoComplete="new-password"
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

            <FormField
                control={control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                    <Input
                        type="password"
                        placeholder="*******"
                        autoComplete="new-password"
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

            <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Guardando..." : "Guardar nueva contraseña"}
            </Button>
            </form>
        </Form>

        <Link to="/login" className="underline text-sm">
            Volver al login
        </Link>
        </div>
    </div>
    );
}