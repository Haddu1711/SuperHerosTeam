"use client";
import { paths } from "@/constants/routes";
import { useAuth } from "@/contexts/AuthContextProvider";
import Link from "next/link";
import { LogoutButton } from "../auth/logout-button";
import { Button } from "../ui/button";
import Logo from "./logo";

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <nav className="z-10 sticky top-0 left-0 right-0 py-2 bg-accent flex w-full items-center justify-between gap-8 border-b border-gray-200 px-8 shadow">
      <div className="flex items-center gap-2">
        <Link href={paths.HOME}>
          <Logo />
        </Link>
      </div>

      <section className="flex flex-row gap-4 lg:px-12">
        <Link href={paths.HERO.main}>Superheroes</Link>

        {!!user && (
          <>
            <Link href={paths.FAV.fav_list}>My Favorites</Link>
            <Link href={paths.TEAMS.recommended}>Recommended Teams</Link>
          </>
        )}
      </section>

      <div className="items-end">
        {loading ? null : user ? (
          <LogoutButton />
        ) : (
          <div className="flex flex-row gap-4">
            <Link href={paths.AUTH.LOGIN}>
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href={paths.AUTH.REGISTER}>
              <Button>Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
