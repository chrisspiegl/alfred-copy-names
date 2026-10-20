import fs from 'node:fs'
import path from 'node:path'

const invalidInputItem = {
  title: 'Input must be valid and existing file(s) or folder(s)',
  valid: false,
}

function readLinkStat(filepath) {
  try {
    return fs.lstatSync(filepath)
  }
  catch {
    return undefined
  }
}

export function isFileAction(input) {
  const filePaths = input
    .filter(element => Boolean(element.trim()))
    .filter((filepath) => {
      if (filepath.slice(0, 1) !== '/')
        return false

      const stat = readLinkStat(filepath.trim())
      if (!stat)
        return false

      return stat.isFile() || stat.isDirectory()
    })

  return filePaths.length > 0
}

const options = [
  {
    prefix: 'Copy File Names',
    match: 'copy file name names filenames filename files',
    action: (filepath) => {
      const stat = readLinkStat(filepath)
      if (!stat?.isFile())
        return false

      const { name, ext } = path.parse(filepath)
      return `${name}${ext}`
    },
  },
  {
    prefix: 'Copy File Names (no extension)',
    match: 'copy file name names filenames filename files without no extension',
    action: (filepath) => {
      const stat = readLinkStat(filepath)
      if (!stat?.isFile())
        return false

      const { name } = path.parse(filepath)
      return `${name}`
    },
  },
  {
    prefix: 'Copy Folder Names',
    match: 'copy folder name names foldernames foldername folders',
    action: (filepath) => {
      const stat = readLinkStat(filepath)
      if (!stat?.isDirectory())
        return false

      return path.basename(filepath)
    },
  },
  {
    prefix: 'Copy All Names',
    match: 'copy all name names allnames',
    action: filepath => path.basename(filepath),
  },
  {
    prefix: 'Copy All Names (no file extension)',
    match: 'copy all name names allnames without no extension',
    action: (filepath) => {
      const stat = readLinkStat(filepath)
      if (!stat)
        return false

      if (stat.isDirectory())
        return path.basename(filepath)

      const { name } = path.parse(filepath)
      return `${name}`
    },
  },
]

export function run(input) {
  if (!isFileAction(input))
    return [invalidInputItem]

  return options.map((option) => {
    const files = input.map(filepath => option.action(filepath)).filter(element => Boolean(element))
    const item = {
      title: `${option.prefix}: ${files}`,
      subtitle: 'Copy to clipboard',
      match: option.match,
      arg: files.join('\n'),
    }

    if (files.length === 0)
      item.valid = false

    return item
  })
}
