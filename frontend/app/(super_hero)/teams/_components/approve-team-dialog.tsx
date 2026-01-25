"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RecommendedTeam, TeamUpdatePayload } from "@/types/teams/team";
import { teamUpdateAction } from "@/lib/teams/team";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  team?: RecommendedTeam | null;
  onApproved: () => void;
};

export default function ApproveTeamDialog({
  open,
  onClose,
  team,
  onApproved,
}: Props) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(team?.name ?? "");
  const [description, setDescription] = useState(team?.description ?? "");
  const [explanation, setExplanation] = useState(team?.explanation ?? "");

  useEffect(() => {
    if (team) {
      setName(team.name);
      setDescription(team?.description ?? "");
      setExplanation(team?.explanation ?? "");
    }
  }, [team]);

  const handleApprove = async () => {
    if (!team) return;
    setLoading(true);

    const payload: TeamUpdatePayload = { action: "approved" };

    if (edit) {
      payload.name = name;
      payload.description = description;
      payload.explanation = explanation;
    }

    const res = await teamUpdateAction({ id: team.id, payload });

    if (res.error) {
      toast.error(
        edit
          ? "Failed to update the team details."
          : "Failed to update the team status.",
      );
      setLoading(false);
      return;
    }

    onApproved();
    toast.success(
      edit
        ? "Successfully update the team details."
        : "Successfully update the team status.",
    );
    setLoading(false);
    setEdit(false);
    onClose();
  };

  console.log(team);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-center space-y-4">
        <DialogHeader>
          <DialogTitle className="text-center">Approve Team</DialogTitle>
        </DialogHeader>

        {!edit ? (
          <div className="space-y-4 flex flex-col justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Do you want to update the team details before approving?
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setEdit(true)}
                disabled={loading}
                className="cursor-pointer"
              >
                Yes, update details
              </Button>

              <Button
                onClick={handleApprove}
                disabled={loading}
                className="cursor-pointer"
              >
                Approve as is
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              placeholder="Team name"
              value={name}
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Textarea
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
            />

            <Textarea
              placeholder="Why this team works"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              maxLength={500}
            />
          </div>
        )}

        {edit && (
          <div className="flex gap-3 w-full justify-center items-center">
            <Button
              variant="outline"
              onClick={() => setEdit(false)}
              disabled={loading}
              className="cursor-pointer"
            >
              Back
            </Button>
            <Button
              onClick={handleApprove}
              disabled={loading}
              className="cursor-pointer"
            >
              Approve Team
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
