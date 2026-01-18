"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { login } from "@/lib/auth/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { paths } from "@/constants/routes";
import Logo from "@/components/app/logo";

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");

    try {
      await login(data.username, data.password);
      router.push("/");
    } catch {
      setError("Invalid username or password");
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
        <CardHeader className="text-2xl font-medium">Login</CardHeader>

        <CardContent className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="Username"
              disabled={loading}
              {...register("username")}
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
                  Logging in…
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <div className="flex justify-center items-center w-full text-sm">
            Don't have an account?{" "}
            <Link href={paths.AUTH.REGISTER}>
              <Button variant="link" className="cursor-pointer">
                Register here
              </Button>{" "}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
