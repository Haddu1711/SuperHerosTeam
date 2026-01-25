"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { teamUpdateAction } from "@/lib/teams/team";
import { TeamUpdatePayload } from "@/types/teams/team";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  teamId?: number | string;
  onRejected: () => void;
};

export default function RejectTeamDialog({
  open,
  onClose,
  teamId,
  onRejected,
}: Props) {
  const [loading, setLoading] = useState(false);
  const handleReject = async () => {
    if (!teamId) return;
    setLoading(true);

    const payload: TeamUpdatePayload = { action: "rejected" };
    const res = await teamUpdateAction({ id: teamId, payload });

    if (res.error) {
      toast.error("Failed to remove the team.");
      setLoading(false);
      return;
    }

    onRejected();
    toast.error("Successfully removed the team.");
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-center space-y-4">
        <DialogHeader>
          <DialogTitle className="text-center">Reject Team</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to reject this team?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex gap-3 w-full justify-center items-center">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={loading}
          >
            Reject Team
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
