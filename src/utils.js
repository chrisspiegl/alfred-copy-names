export function findFilter(input) {
  const regexFilter = /(!(?<filter>[a-z ]*))?$/i
  const regexMatches = input.trim().match(regexFilter)
  const foundFilter = regexMatches?.groups.filter
  const inputWithoutFilter = input.trim().replace(regexFilter, '')
  return {
    inputWithoutFilter,
    foundFilter,
  }
}
