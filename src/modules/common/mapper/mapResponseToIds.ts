type MapResponseToIdsProps<T> = {
  result: T[];
  ids: string[];
  byKey: string;
};

/*
 * This is a generic function to map the returns of batch requests
 * we take in a list of string ids (ids)
 * and then we run through the list of *result* to map the resulting
 * items *byKey* into their associated id
 */
export function mapResponseToIds<T>({
  result,
  ids,
  byKey,
}: MapResponseToIdsProps<T>): T[][] {
  const reduced = result.reduce((acc: Record<string, T[]>, row) => {
    if (!acc[row[byKey]]) acc[row[byKey]] = [];
    acc[row[byKey]].push(row);
    return acc;
  }, {});
  return ids.map((id) => reduced[id] || []);
}
