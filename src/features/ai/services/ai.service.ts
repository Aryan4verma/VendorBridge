import { createClient } from "@/services/supabase/client";
import type { AiRecommendation } from "@/types/database";

const supabase = createClient();

export const aiService = {
  async getRecommendations(rfqId: string): Promise<AiRecommendation[]> {
    const { data, error } = await supabase
      .from("ai_recommendations")
      .select("*")
      .eq("rfq_id", rfqId)
      .order("confidence_score", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async createRecommendation(rfqId: string, vendorId: string, confidenceScore: number, reasoning: string): Promise<AiRecommendation> {
    const { data, error } = await supabase
      .from("ai_recommendations")
      .insert({
        rfq_id: rfqId,
        recommended_vendor_id: vendorId,
        confidence_score: confidenceScore,
        reasoning,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteRecommendationsForRfq(rfqId: string): Promise<void> {
    const { error } = await supabase
      .from("ai_recommendations")
      .delete()
      .eq("rfq_id", rfqId);
    if (error) throw error;
  },

  async getTopRecommendation(rfqId: string): Promise<AiRecommendation | null> {
    const { data, error } = await supabase
      .from("ai_recommendations")
      .select("*")
      .eq("rfq_id", rfqId)
      .order("confidence_score", { ascending: false })
      .limit(1)
      .single();
    if (error) throw error;
    return data;
  },
};
