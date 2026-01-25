"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction: () => void;
  loading?: boolean;
};

export default function EmptyState({
  title = "No Recommended Teams Yet",
  description = "Generate smart team recommendations based on superhero abilities and strategies.",
  actionLabel = "Generate Teams",
  onAction,
  loading = false,
}: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Sparkles className="h-6 w-6 text-muted-foreground" />
      </div>

      <div className="space-y-1 max-w-md">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Button onClick={onAction} disabled={loading} className="cursor-pointer">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {actionLabel}
      </Button>
    </Card>
  );
}
