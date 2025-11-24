"use server";

import Airtable from "airtable";

export const base = new Airtable({
  apiKey: process.env.AIRTABLE_PAT,
}).base(process.env.AIRTABLE_BASE_ID!);

export async function listRecords(
  table: string,
  recordIds: string[] | undefined,
  sortField: string,
  map: (record: Airtable.Record<any>) => any
) {
  if (!recordIds) {
    return [];
  }

  const records = await base(table)
    .select({
      filterByFormula: `OR(${recordIds.map((id) => `RECORD_ID() = '${id}'`).join(",")})`,
      sort: [{ field: sortField, direction: "desc" }],
    })
    .all();

  return records.map(map);
}
