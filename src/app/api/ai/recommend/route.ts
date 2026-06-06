import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key not configured. Set OPENAI_API_KEY in .env.local" }, { status: 500 });
    }
    const openai = new OpenAI({ apiKey });

    const { rfq, quotations, vendors } = (await request.json()) as {
      rfq: { id: string; title: string; description: string; quantity: number; deadline: string };
      quotations: { id: string; vendor_id: string; price: number; delivery_days: number; notes: string | null; status: string }[];
      vendors: { id: string; company_name: string; vendor_code: string; category: string; rating: number | null }[];
    };

    if (!quotations.length) {
      return NextResponse.json({ error: "No quotations to analyze" }, { status: 400 });
    }

    const vendorMap = new Map(vendors.map((v) => [v.id, v]));

    const quotationData = quotations.map((q) => {
      const vendor = vendorMap.get(q.vendor_id);
      return {
        vendor_name: vendor?.company_name ?? "Unknown",
        vendor_code: vendor?.vendor_code ?? "N/A",
        category: vendor?.category ?? "N/A",
        rating: vendor?.rating,
        price: q.price,
        delivery_days: q.delivery_days,
        notes: q.notes ?? "",
      };
    });

    const prompt = `You are an expert procurement analyst for a manufacturing company. Analyze the following RFQ and quotations to recommend the best vendor.

RFQ Details:
- Title: ${rfq.title}
- Description: ${rfq.description || "N/A"}
- Quantity: ${rfq.quantity}
- Deadline: ${rfq.deadline}

Quotations (${quotations.length} total):
${quotationData.map((q, i) => `${i + 1}. ${q.vendor_name} (${q.vendor_code}) — Category: ${q.category}, Rating: ${q.rating ?? "N/A"}, Price: ₹${q.price.toLocaleString("en-IN")}, Delivery: ${q.delivery_days} days${q.notes ? `, Notes: ${q.notes}` : ""}`).join("\n")}

Analyze and return a JSON object with this exact structure:
{
  "recommended_vendor": "vendor name",
  "recommended_vendor_id": "vendor id from the list",
  "confidence_score": 0.0 to 1.0,
  "reasoning": "detailed reasoning paragraph explaining why this vendor is recommended",
  "factors": ["factor1", "factor2", "factor3"]
}

Consider these factors:
1. Price competitiveness (lower is generally better)
2. Delivery speed (faster is better, must meet deadline)
3. Vendor rating and track record
4. Category expertise match
5. Overall value (balance of price, speed, quality)

Return ONLY the JSON object, no markdown or additional text.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a procurement AI assistant. Always return valid JSON." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content?.trim();
    if (!content) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 500 });
    }

    let result: {
      recommended_vendor: string;
      recommended_vendor_id: string;
      confidence_score: number;
      reasoning: string;
      factors: string[];
    };

    try {
      result = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return NextResponse.json({ error: "Could not parse AI response" }, { status: 500 });
      }
      result = JSON.parse(jsonMatch[0]);
    }

    result.confidence_score = Math.max(0, Math.min(1, result.confidence_score ?? 0.5));
    if (!result.recommended_vendor_id) {
      const matched = quotationData.find((q) => q.vendor_name === result.recommended_vendor);
      if (matched) {
        const vendor = vendors.find((v) => v.company_name === matched.vendor_name);
        if (vendor) result.recommended_vendor_id = vendor.id;
      }
    }
    if (!result.recommended_vendor_id && quotations.length > 0) {
      result.recommended_vendor_id = quotations[0].vendor_id;
      result.recommended_vendor = vendorMap.get(quotations[0].vendor_id)?.company_name ?? "Unknown";
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI recommendation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "AI recommendation failed" },
      { status: 500 },
    );
  }
}
