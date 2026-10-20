import alfy from 'alfy'
import { run } from './src/names.js'
import { findFilter } from './src/utils.js'

function filterOutput(filter, output) {
  const filterParts = filter.split(' ')
  let items = output
  for (const filterPart of filterParts)
    items = alfy.matches(filterPart, items, 'match')

  return items
}

const { inputWithoutFilter, foundFilter } = findFilter(alfy.input)
const input = inputWithoutFilter
  .replaceAll('\t', '\n')
  .split('\n')
  .map(element => element.trim())

const output = run(input)
if (output.length > 0) {
  alfy.output(foundFilter ? filterOutput(foundFilter, output) : output)
}
else {
  alfy.output([
    {
      title: 'Nothing to process…',
      subtitle: 'No files selected?',
    },
  ])
}
