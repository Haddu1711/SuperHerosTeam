import { Button } from "@/components/ui/button";
import { paths } from "@/constants/routes";
import { useAuth } from "@/contexts/AuthContextProvider";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const { sessionLogout } = useAuth();

  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={() => {
        sessionLogout();
        router.push(paths.HOME);
      }}
    >
      Logout
    </Button>
  );
}
