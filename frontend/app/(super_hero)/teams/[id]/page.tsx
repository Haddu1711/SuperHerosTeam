import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchTeamDetailAction } from "@/lib/teams/team";
import { SuperHero } from "@/types/heros/super-hero";
import { TeamDetailDataType } from "@/types/teams/team";
import { notFound } from "next/navigation";
import HeroGridList from "../../_components/hero-grid-list";

const TeamDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  if (!id) {
    return notFound();
  }

  const res = await fetchTeamDetailAction({ id });

  if (res.error) {
    return notFound();
  }

  const team: TeamDetailDataType = res.data;

  const teamMembers: SuperHero[] = team.members.map((member) => member.hero);

  return (
    <div className="space-y-6">
      {/* <div className="flex gap-6 flex-col lg:flex-row"> */}
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">{team.name}</h1>
        </div>
        {team.description && (
          <p className="text-muted-foreground">{team.description}</p>
        )}
      </div>
      {/* Meta */}
      <Card>
        <CardContent className="">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground">Type</p>
              <Badge variant="outline" className="capitalize">
                {team.team_type}
              </Badge>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground">Strength</p>
              <Badge variant={team.team_strength} className="capitalize">
                {team.team_strength}
              </Badge>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground">Score</p>
              <p className="font-medium">{team.score ?? 0}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground">Created</p>
              <p className="font-medium">
                {new Date(team.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Explanation */}
      {team?.explanation && (
        <Card>
          <CardHeader>
            <h2 className="font-semibold">Why this team works</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {team?.explanation ?? "No explanation available."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Members */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Team Members</h2>
        <HeroGridList heros={teamMembers} />
      </section>

      {/* </div> */}
    </div>
  );
};

export default TeamDetailPage;
