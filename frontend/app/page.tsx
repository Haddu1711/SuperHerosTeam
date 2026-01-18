import { Button } from "@/components/ui/button";
import { paths } from "@/constants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col gap-5 items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <h2>Welcome to the Super Heros World!</h2>
        <Link href={paths.HERO.main} className="cursor-pointer">
          <Button>Explore Super Heros</Button>
        </Link>
      </main>
    </div>
  );
}
