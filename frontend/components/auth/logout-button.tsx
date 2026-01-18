import { logout } from "@/lib/auth/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => {
        logout();
        router.push("/login");
      }}
    >
      Logout
    </Button>
  );
}
