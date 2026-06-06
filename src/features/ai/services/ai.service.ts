import { createClient } from "@/services/supabase/client";
import type { AiRecommendation } from "@/types/database";

const supabase = createClient();

export interface AiRecommendationResult {
  recommended_vendor: string;
  recommended_vendor_id: string;
  confidence_score: number;
  reasoning: string;
  factors: string[];
}

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
    if (error && error.code !== "PGRST116") throw error;
    return data;
  },

  async recommend(rfqId: string): Promise<AiRecommendationResult & { saved: AiRecommendation }> {
    const { data: rfq, error: rfqErr } = await supabase
      .from("rfqs")
      .select("*")
      .eq("id", rfqId)
      .single();
    if (rfqErr || !rfq) throw new Error("RFQ not found");

    const { data: quotations, error: qErr } = await supabase
      .from("quotations")
      .select("*")
      .eq("rfq_id", rfqId);
    if (qErr) throw qErr;
    if (!quotations?.length) throw new Error("No quotations found for this RFQ");

    const vendorIds = [...new Set(quotations.map((q) => q.vendor_id))];
    const { data: vendors, error: vErr } = await supabase
      .from("vendors")
      .select("id, company_name, vendor_code, category, rating")
      .in("id", vendorIds);
    if (vErr) throw vErr;

    const response = await fetch("/api/ai/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rfq: { id: rfq.id, title: rfq.title, description: rfq.description, quantity: rfq.quantity, deadline: rfq.deadline },
        quotations: quotations.map((q) => ({ id: q.id, vendor_id: q.vendor_id, price: q.price, delivery_days: q.delivery_days, notes: q.notes, status: q.status })),
        vendors: vendors ?? [],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "AI recommendation failed");
    }

    const result: AiRecommendationResult = await response.json();

    await aiService.deleteRecommendationsForRfq(rfqId);

    const saved = await aiService.createRecommendation(
      rfqId,
      result.recommended_vendor_id,
      result.confidence_score,
      result.reasoning,
    );

    return { ...result, saved };
  },
};
