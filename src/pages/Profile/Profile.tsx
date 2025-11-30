import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { SquareUser } from "lucide-react";
import { useState } from "react";

export default function Perfil() {
  const { user } = useAuth();

  const [edit, setEdit] = useState(false);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="flex text-5xl font-bold justify-center">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-center gap-2 font-bold">
            <SquareUser />
            Profile Data
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div>
            <label className="font-semibold">Name</label>
            {edit ? (
              <Input name="name" />
            ) : (
              <p className="opacity-80">{user?.name}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Email</label>
            {edit ? (
              <Input name="email" />
            ) : (
              <p className="opacity-80">{user?.email}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Role</label>
            <p className="opacity-80">{user?.role}</p>
          </div>

          {edit ? (
            <div className="flex flex-col gap-3">
              <Button className="w-full">Save Changes</Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              className="w-full"
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit Profile
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-center font-bold">
            Orders
          </CardTitle>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
