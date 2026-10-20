import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { after, test } from 'node:test' // eslint-disable-line test/no-import-node-test
import { isFileAction, run } from '../src/names.js'

const invalidInputItem = {
  title: 'Input must be valid and existing file(s) or folder(s)',
  valid: false,
}

const root = mkdtempSync(path.join(tmpdir(), 'alfred-copy-names-'))
const filePath = path.join(root, 'notes.txt')
const barePath = path.join(root, 'README')
const folderPath = path.join(root, 'Photos')
const linkPath = path.join(root, 'link.txt')
const missingPath = path.join(root, 'missing.txt')

writeFileSync(filePath, 'hello')
writeFileSync(barePath, '')
mkdirSync(folderPath)
symlinkSync(filePath, linkPath)

after(() => {
  rmSync(root, { recursive: true, force: true })
})

function rowByPrefix(items, prefix) {
  return items.find(item => item.title.startsWith(`${prefix}:`))
}

test('a missing path returns the existing error row', () => {
  assert.equal(isFileAction([missingPath]), false)
  assert.deepEqual(run([missingPath]), [invalidInputItem])
})

test('blank and relative paths return the existing error row', () => {
  assert.deepEqual(run(['']), [invalidInputItem])
  assert.deepEqual(run(['   ']), [invalidInputItem])
  assert.deepEqual(run(['notes.txt']), [invalidInputItem])
  assert.deepEqual(run([]), [invalidInputItem])
})

test('a symlink is not a file or folder, so it returns the error row', () => {
  assert.equal(isFileAction([linkPath]), false)
  assert.deepEqual(run([linkPath]), [invalidInputItem])
})

test('a missing path next to a real file does not abort the filter', () => {
  const items = run([filePath, missingPath])

  assert.equal(items.length, 5)
  assert.equal(rowByPrefix(items, 'Copy File Names').arg, 'notes.txt')
  assert.notEqual(rowByPrefix(items, 'Copy File Names').valid, false)
  assert.equal(rowByPrefix(items, 'Copy Folder Names').valid, false)
})

test('a file marks the folder row invalid', () => {
  const items = run([filePath])

  assert.equal(rowByPrefix(items, 'Copy File Names').title, 'Copy File Names: notes.txt')
  assert.equal(rowByPrefix(items, 'Copy File Names').arg, 'notes.txt')
  assert.notEqual(rowByPrefix(items, 'Copy File Names').valid, false)
  assert.equal(rowByPrefix(items, 'Copy File Names (no extension)').arg, 'notes')
  assert.equal(rowByPrefix(items, 'Copy Folder Names').arg, '')
  assert.equal(rowByPrefix(items, 'Copy Folder Names').valid, false)
  assert.equal(rowByPrefix(items, 'Copy All Names').arg, 'notes.txt')
  assert.equal(rowByPrefix(items, 'Copy All Names (no file extension)').arg, 'notes')
})

test('a folder marks the file-name rows invalid', () => {
  const items = run([folderPath])

  assert.equal(rowByPrefix(items, 'Copy File Names').valid, false)
  assert.equal(rowByPrefix(items, 'Copy File Names').arg, '')
  assert.equal(rowByPrefix(items, 'Copy File Names (no extension)').valid, false)
  assert.equal(rowByPrefix(items, 'Copy Folder Names').arg, 'Photos')
  assert.notEqual(rowByPrefix(items, 'Copy Folder Names').valid, false)
  assert.equal(rowByPrefix(items, 'Copy All Names').arg, 'Photos')
  assert.equal(rowByPrefix(items, 'Copy All Names (no file extension)').arg, 'Photos')
})

test('a file without an extension does not gain a trailing dot', () => {
  const items = run([barePath])

  assert.equal(rowByPrefix(items, 'Copy File Names').arg, 'README')
  assert.equal(rowByPrefix(items, 'Copy File Names (no extension)').arg, 'README')
})

test('several paths keep each kind of name and join copies with newlines', () => {
  const items = run([filePath, barePath, folderPath])

  assert.equal(rowByPrefix(items, 'Copy File Names').arg, 'notes.txt\nREADME')
  assert.equal(rowByPrefix(items, 'Copy File Names').title, 'Copy File Names: notes.txt,README')
  assert.equal(rowByPrefix(items, 'Copy Folder Names').arg, 'Photos')
  assert.equal(rowByPrefix(items, 'Copy All Names').arg, 'notes.txt\nREADME\nPhotos')
  assert.equal(rowByPrefix(items, 'Copy All Names (no file extension)').arg, 'notes\nREADME\nPhotos')
  assert.notEqual(rowByPrefix(items, 'Copy File Names').valid, false)
  assert.notEqual(rowByPrefix(items, 'Copy Folder Names').valid, false)
})
