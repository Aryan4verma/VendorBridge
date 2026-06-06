"use client";
import { useState, useEffect, useCallback } from "react";
import { aiService } from "@/features/ai/services/ai.service";
import type { AiRecommendation } from "@/types/database";

export function useAi(rfqId?: string) {
  const [recommendations, setRecommendations] = useState<AiRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    if (!rfqId) {
      setRecommendations([]);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const data = await aiService.getRecommendations(rfqId);
      setRecommendations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch AI recommendations");
    } finally {
      setIsLoading(false);
    }
  }, [rfqId]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return { recommendations, isLoading, error, refetch: fetchRecommendations };
}
