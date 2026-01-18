"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { register as registerUser } from "@/lib/auth/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { paths } from "@/constants/routes";
import Link from "next/link";
import { toast } from "sonner";
import Logo from "@/components/app/logo";

const RegisterPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");

    try {
      const res = await registerUser(data.username, data.email, data.password);
      if (res.status === 201) {
        toast.success("Registration successful!");
        router.push("/login");
      }
    } catch {
      toast.error("Registration failed", {
        description: "Something went wrong! Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-120">
        <div className="w-full flex justify-center items-center">
          <Logo />
        </div>
        <CardHeader className="text-2xl font-medium">Register</CardHeader>

        <CardContent className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="Username"
              disabled={loading}
              {...register("username")}
            />

            <Input
              placeholder="Email"
              disabled={loading}
              {...register("email")}
            />

            <Input
              type="password"
              placeholder="Password"
              disabled={loading}
              {...register("password")}
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
          <div className="flex justify-center items-center w-full text-sm">
            Already have an account?{" "}
            <Link href={paths.AUTH.LOGIN}>
              <Button variant="link" className="cursor-pointer">
                Login here
              </Button>{" "}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
