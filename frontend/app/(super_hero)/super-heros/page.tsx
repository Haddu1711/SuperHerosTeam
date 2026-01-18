import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { paths } from "@/constants/routes";
import { fetchSuperHerosAction } from "@/lib/heros/super-heros";
import { SuperHeroListData } from "@/types/heros/super-hero";
import HeroGridList from "../_components/hero-grid-list";

const PAGE_SIZE = Number(process.env.PAGE_SIZE ?? 30);

export default async function HeroesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page ?? 1);
  const res = await fetchSuperHerosAction({ page: currentPage });

  const data: SuperHeroListData = res.data;
  const totalPages = Math.ceil(data.count / PAGE_SIZE);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Super Heroes</h1>

      <HeroGridList heros={data.results} />

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
    </div>
  );
}
