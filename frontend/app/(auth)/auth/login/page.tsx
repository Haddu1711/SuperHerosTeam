"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { login } from "@/lib/auth/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { paths } from "@/constants/routes";
import Logo from "@/components/app/logo";
import { Label } from "@/components/ui/label";
import { ApiResponse, FieldErrors } from "@/types/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContextProvider";

type FormData = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const { setSessionUser } = useAuth();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrors({});

    try {
      const res: ApiResponse = await login(data.username, data.password);
      if (res.error) {
        if (res.error.fieldErrors) {
          if ("detail" in res.error.fieldErrors) {
            toast.error(res.error.fieldErrors.detail);
          } else {
            setErrors(res.error.fieldErrors ?? {});
          }
        } else {
          setGlobalError(res.error.message ?? "");
        }
        setLoading(false);
        return;
      }
      void setSessionUser();
      toast.success("Login successful!");
      router.push(next ?? paths.HOME);
    } catch {
      toast.error("Login failed", {
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
        <CardHeader className="text-2xl font-medium">Login</CardHeader>

        <CardContent className="flex flex-col gap-4">
          {globalError && <p className="text-sm text-red-500">{globalError}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label>Username</Label>
              <Input disabled={loading} {...register("username")} />
              {errors.username && (
                <p className="text-xs text-red-500">{errors.username[0]}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Password</Label>
              <Input
                type="password"
                disabled={loading}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password[0]}</p>
              )}
            </div>

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
            Don&apos;t have an account?{" "}
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
