# alfred-copy-names

Alfred workflow to copy just the file and/or folder names to your clipboard.

Alfred itself provides a file action to copy the file and folder paths. It does not provide an action to copy just the names. This workflow lists five actions:

- Copy File Names
- Copy File Names (no extension)
- Copy Folder Names
- Copy All Names
- Copy All Names (no file extension)

## Requirements

- [Alfred 5](https://alfredapp.com) with the [Powerpack](https://alfredapp.com/powerpack/)
- [Node.js](https://nodejs.org) 20+ (verified on 24)

## Install

```sh
npm install --global alfred-copy-names
```

## Usage

1. Select files or folders in the macOS Finder.
2. Open Alfred File Actions and choose `Copy Names…`.
3. Pick one of the five actions:
   1. Copy File Names
   2. Copy File Names (no extension)
   3. Copy Folder Names
   4. Copy All Names
   5. Copy All Names (no file extension)
4. Filter the list by adding `!file`, `!folder`, or `!fil ext` at the end of the Alfred input.
5. Press Return. The names are copied to the clipboard.

## Development

```sh
pnpm install
pnpm lint
pnpm test
pnpm release
```

## Release

From a clean `main` checkout, `pnpm release` prompts for the version, publishes to npm with pnpm, and creates the GitHub release. Requires npm login and a GitHub token (`GITHUB_TOKEN`) or `gh` auth.

## Related

- [More Alfred Workflows](https://github.com/chrisspiegl/alfred-workflows) - My Alfred Workflow Directory
- [alfy](https://github.com/sindresorhus/alfy) - Create Alfred workflows with ease
- [Copy name [1.6]](https://www.alfredforum.com/topic/1733-file-action-16-copy-folderfile-name/) - My workflow was inspired by this workflow by [mcskrzypczak](https://www.alfredforum.com/profile/336-mcskrzypczak/?tab=field_core_pfield_12)
