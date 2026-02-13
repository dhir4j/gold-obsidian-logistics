import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface HSNEntry {
  code: string;
  description: string;
}

interface HSNNode {
  code: string;
  description: string;
  children: Record<string, HSNNode>;
}

// Module-level cache — loaded once per server lifecycle
let flatHSN: HSNEntry[] | null = null;

function flattenHSN(node: Record<string, HSNNode>): HSNEntry[] {
  const results: HSNEntry[] = [];
  for (const key in node) {
    const item = node[key];
    const children = item.children;
    if (!children || Object.keys(children).length === 0) {
      results.push({ code: item.code, description: item.description });
    } else {
      // Also include parent nodes so broader categories are searchable
      results.push({ code: item.code, description: item.description });
      results.push(...flattenHSN(children));
    }
  }
  return results;
}

function loadHSN(): HSNEntry[] {
  if (flatHSN) return flatHSN;

  const jsonPath = path.join(process.cwd(), "data", "HSN_SAC.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const tree: Record<string, HSNNode> = JSON.parse(raw);
  flatHSN = flattenHSN(tree);
  return flatHSN;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim().toLowerCase();

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const entries = loadHSN();
  const terms = query.split(/\s+/);

  const matches: HSNEntry[] = [];
  for (const entry of entries) {
    const desc = entry.description.toLowerCase();
    if (terms.every((t) => desc.includes(t))) {
      matches.push(entry);
      if (matches.length >= 20) break;
    }
  }

  return NextResponse.json({ results: matches });
}
