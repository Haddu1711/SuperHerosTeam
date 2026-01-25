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
import { PAGE_SIZE } from "@/constants/utils";
import { fetchRecommendedTeams } from "@/lib/teams/recommend";
import { User } from "@/types/auth/auth-user";
import { RecommendedTeamListData, TeamStatus } from "@/types/teams/team";
import TeamList from "../_components/team-list";

export default async function RecommendedTeamsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const { page, status: filterStatus } = await searchParams;
  const currentPage = Number(page ?? 1);
  const sessionRes = await getServerSideSessionUser();
  const sessionResData = sessionRes.data as User | null;

  if (!sessionResData) {
    return <LoginRequired nextPath={paths.TEAMS.recommended} />;
  }
  const res = await fetchRecommendedTeams({});

  const data: RecommendedTeamListData = res.data;
  const totalPages = Math.ceil(data?.count / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <TeamList
        initialTeams={data?.results}
        filterStatus={(filterStatus ?? "draft") as TeamStatus}
      />

      {totalPages ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  currentPage > 1
                    ? `${paths.TEAMS.recommended}/?page=${currentPage - 1}`
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
                    href={`${paths.TEAMS.recommended}/?page=${page}`}
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
                    ? `${paths.TEAMS.recommended}/?page=${currentPage + 1}`
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
