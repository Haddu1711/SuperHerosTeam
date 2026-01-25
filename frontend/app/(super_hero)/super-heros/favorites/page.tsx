import LoginRequired from "@/app/(auth)/_components/login-required";
import { getServerSideSessionUser } from "@/app/actions/auth";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { paths } from "@/constants/routes";
import { fetchUserFavSuperHeroListAction } from "@/lib/favorite-hero/favorite-actions";
import { User } from "@/types/auth/auth-user";
import { SuperHeroListData } from "@/types/heros/super-hero";
import { redirect } from "next/navigation";
import HeroGridList from "../../_components/hero-grid-list";

const PAGE_SIZE = Number(process.env.PAGE_SIZE ?? 30);

export default async function FavoriteHeroPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page ?? 1);

  const sessionRes = await getServerSideSessionUser();
  const sessionResData = sessionRes.data as User | null;

  if (!sessionResData) {
    return <LoginRequired nextPath={paths.FAV.fav_list} />;
  }

  const res = await fetchUserFavSuperHeroListAction({ page: currentPage });
  if (res.error) {
    redirect(paths.HOME);
  }

  const data: SuperHeroListData = res.data;
  const totalPages = Math.ceil(data.count / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Favorite Super Heroes</h1>

      <HeroGridList heros={data.results} />

      {totalPages ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  currentPage > 1
                    ? `${paths.HERO.main}/?page=${currentPage - 1}`
                    : undefined
                }
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1,
              )
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`${paths.HERO.main}/?page=${page}`}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? `${paths.HERO.main}/?page=${currentPage + 1}`
                    : undefined
                }
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : (
        <></>
      )}
    </div>
  );
}
