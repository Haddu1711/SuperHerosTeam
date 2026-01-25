"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { paths } from "@/constants/routes";
import { RecommendedTeam, TeamStatus } from "@/types/teams/team";
import { CircleCheckBig, CircleX, Users } from "lucide-react";
import Link from "next/link";

export default function TeamCard({
  team,
  onAction,
}: {
  team: RecommendedTeam;
  onAction: (team: RecommendedTeam, status: TeamStatus) => void;
}) {
  return (
    <Card className="min-h-65 flex flex-col justify-between">
      {/* Header */}
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={paths.TEAMS.team_detail(team.id)}
            className="text-blue-700 hover:text-blue-600 hover:underline"
          >
            <h3 className="font-semibold leading-tight line-clamp-2">
              {team.name}
            </h3>
          </Link>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="capitalize">
              {team.team_type}
            </Badge>
            <Badge variant={team.team_strength} className="capitalize">
              {team.team_strength}
            </Badge>
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4">
        {team.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {team.description}
          </p>
        )}

        {/* Members */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {team.members.slice(0, 5).map((member) => (
              <Tooltip key={member.hero.id}>
                <TooltipTrigger asChild>
                  <Link href={paths.HERO.heor_detail(member.hero.slug)}>
                    <Avatar className="h-10 w-10 border hover:scale-125 hover:z-10">
                      <AvatarImage
                        src={member.hero?.image_url ?? ""}
                        alt={member.hero.name}
                        className="grayscale hover:grayscale-0"
                      />
                      <AvatarFallback>
                        {member.hero.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{member.hero.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}

            {team.members.length > 5 && (
              <div className="h-8 w-8 rounded-full border flex items-center justify-center text-xs bg-muted">
                +{team.members.length - 5}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {team.members.length}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            {/* Actions */}
            {team.status === "draft" && (
              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size={"sm"}
                      className="cursor-pointer bg-green-100 text-green-900 hover:bg-green-200"
                      onClick={() => onAction(team, "approved")}
                    >
                      <CircleCheckBig />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Approve Team</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size={"sm"}
                      variant="destructive"
                      className="cursor-pointer bg-red-100 text-red-900 hover:bg-red-200"
                      onClick={() => onAction(team, "rejected")}
                    >
                      <CircleX />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Remove Team</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
          {/* Score */}
          <span className="text-sm font-medium">Score: {team.score}</span>
        </div>
      </CardContent>
    </Card>
  );
}
