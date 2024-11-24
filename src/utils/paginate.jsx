import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; // Calculate where to start
  return _(items) // Start using Lodash on the items
    .slice(startIndex) // Get the items from startIndex to the end
    .take(pageSize) // Take only the number of items we want for this page
    .value(); // Get the final list of items
}
