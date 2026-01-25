"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchJobStatus,
  fetchRecommendedTeams,
  triggerTeamGeneration,
} from "@/lib/teams/recommend";
import { RecommendedTeam, TeamStatus } from "@/types/teams/team";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EmptyState from "../_components/empty-state";
import TeamCard from "../_components/team-card";
import ApproveTeamDialog from "./approve-team-dialog";
import RejectTeamDialog from "./reject-team-dialog";

type ListFilterType = {
  type: string;
  value: string;
  label: string;
  filterLabel: string;
};

const LIST_FILTER: Record<TeamStatus, ListFilterType> = {
  draft: {
    type: "status",
    value: "draft",
    label: "Recommended Teams",
    filterLabel: "Recommended",
  },
  approved: {
    type: "status",
    value: "approved",
    label: "Approved Teams",
    filterLabel: "Approved",
  },
  rejected: {
    type: "status",
    value: "rejected",
    label: "Discarded Teams",
    filterLabel: "Discarded",
  },
};

const TeamList = ({
  initialTeams,
  filterStatus,
}: {
  initialTeams: RecommendedTeam[];
  filterStatus?: TeamStatus;
}) => {
  const [teams, setTeams] = useState<RecommendedTeam[]>(initialTeams ?? []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobId, setJobId] = useState<number | null>(null);
  const [teamLoading, setTeamLoading] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [actionTeam, setActionTeam] = useState<RecommendedTeam | null>();
  const [currentFilter, setCurrentFilter] = useState<TeamStatus>("draft");

  const getTeams = async () => {
    setTeamLoading(true);
    const res = await fetchRecommendedTeams({ filterStatus: currentFilter });
    if (res && res.data) {
      const data = res.data;
      setTeams(data.results);
    }
    setTeamLoading(false);
  };

  useEffect(() => {
    void getTeams();
  }, []);

  useEffect(() => {
    if (currentFilter) {
      void getTeams();
    }
  }, [currentFilter]);

  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      const res = await fetchJobStatus(jobId);

      if (res && res.data?.status === "completed") {
        clearInterval(interval);
        setIsGenerating(false);
        setJobId(null);
        getTeams();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [jobId]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const res = await triggerTeamGeneration();
    if (res && res.data?.job_id) {
      setJobId(res.data?.job_id);
    } else {
      toast.error("Failed to start team generation. Please try again later.");
      setIsGenerating(false);
    }
  };

  const handleTeamAction = (team: RecommendedTeam, status: TeamStatus) => {
    if (!team || !status) {
      return;
    }

    if (status === "approved") {
      setApproveOpen(true);
    }
    if (status === "rejected") {
      setRejectOpen(true);
    }
    setActionTeam(team);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-center">
          {LIST_FILTER[currentFilter].label}
        </h1>
        {teams.length > 0 && currentFilter === "draft" && (
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate More Teams"
            )}
          </Button>
        )}
      </div>
      {/* Filters */}
      <div className="flex gap-2 items-center ">
        {Object.values(LIST_FILTER).map(
          ({ value, filterLabel, type }, index) => (
            <label
              key={index}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="radio"
                name="filter"
                value={value}
                checked={currentFilter === value}
                onChange={() =>
                  setCurrentFilter((value ?? "draft") as TeamStatus)
                }
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm">{filterLabel}</span>
            </label>
          ),
        )}
      </div>
      {/* Empty state */}
      {!isGenerating && teams.length === 0 && (
        <EmptyState onAction={handleGenerate} loading={isGenerating} />
      )}
      {/* Grid */}
      <TeamGrid>
        {isGenerating &&
          Array.from({ length: 1 }).map((_, i) => (
            <TeamGenerationSkeletonCard key={`loading-${i}`} />
          ))}
        {teamLoading
          ? teams?.map((e, index) => (
              <Skeleton className="h-65 w-full" key={index} />
            ))
          : teams?.map((team) => (
              <TeamCard key={team.id} team={team} onAction={handleTeamAction} />
            ))}
      </TeamGrid>
      <ApproveTeamDialog
        open={approveOpen}
        onClose={() => setApproveOpen(false)}
        team={actionTeam}
        onApproved={() => {
          void getTeams();
          setActionTeam(null);
        }}
      />

      <RejectTeamDialog
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        teamId={actionTeam?.id}
        onRejected={() => {
          void getTeams();
          setActionTeam(null);
        }}
      />
    </div>
  );
};

export default TeamList;

const TeamGenerationSkeletonCard = () => {
  return (
    <Card className="h-65 flex items-center justify-center p-4 space-y-4 text-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      <p className="text-muted-foreground">
        Your team is being set up. We’re carefully bringing together the
        SuperHeros to ensure the best experience for you.
      </p>
    </Card>
  );
};

const TeamGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};
