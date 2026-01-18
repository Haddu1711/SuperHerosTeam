"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContextProvider";
import {
  getFavHeroUserAction,
  removeFavHeroUserAction,
  setFavHeroUserAction,
} from "@/lib/favorite-hero/favorite-actions";
import clsx from "clsx";
import { Loader2, Star } from "lucide-react";
import { toast } from "sonner";

type Props = {
  heroId: number;
  isDefaultFav: boolean | null;
};

export function FavoriteButton({ heroId, isDefaultFav }: Props) {
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(isDefaultFav ?? false);
  const { user } = useAuth();

  const checkFav = async () => {
    setLoading(true);
    try {
      const res = await getFavHeroUserAction({ heroId });
      setIsFav(res.data.is_favorite);
    } catch (err: any) {
      if (err.status === 401) {
        setLoading(false);
        return;
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    void checkFav();
  }, [heroId]);

  const toggleFav = async () => {
    try {
      setLoading(true);

      if (!user) {
        toast.error("Please sign in to mark superheroes as your favorites.");
        setLoading(false);
        return;
      }

      if (isFav) {
        const res = await removeFavHeroUserAction({ heroId });
        console.log("RESPOMSE::", res);
        if (res.error) {
          toast.error(
            "Failed to remove this superhero from your favorites. Please try again.",
          );
        } else {
          toast.success("Superhero removed from your favorites successfully.");
          setIsFav(false);
        }
      } else {
        const res = await setFavHeroUserAction({ heroId });
        console.log("RESPOMSE::", res);
        if (res.error) {
          toast.error(
            "Failed to add this superhero to your favorites. Please try again.",
          );
        } else {
          toast.success("Superhero added to your favorites successfully.");
          setIsFav(true);
        }
      }
    } catch (err: any) {
      if (err.status === 401) {
        toast.error("Please sign in to mark superheroes as your favorites.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isFav ? "default" : "outline"}
      disabled={loading}
      onClick={toggleFav}
      className={clsx({
        "cursor-pointer": true,
        "bg-yellow-600": isFav,
      })}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <Star
          className={clsx({
            "h-4 w-4 mr-1 cursor-pointer": true,
            "fill-current": isFav,
          })}
        />
        // <Star className={`h-4 w-4 mr-2 ${isFav ? "fill-current" : ""}`} />
      )}
      {isFav ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
}
