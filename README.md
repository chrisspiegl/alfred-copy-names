# alfred-copy-names

> [Alfred](https://alfredapp.com) workflow to copy just the file and folder names to your clipboard

<img src="media/screenshot.png" style="width: 100%;">

Alfred itself provides a file action to copy the file and folder paths.

However, it does not provide an action to copy just the file and folder names.

This workflow provides this in a few variants.

* Copy File Names
* Copy File Names (no extension)
* Copy Folder Names
* Copy all Names
* Copy all Names (no file extension)

## Install

```
npm install --global alfred-copy-names
```

*Requires [Node.js](https://nodejs.org) 14+ and the Alfred [Powerpack](https://alfredapp.com/powerpack/).*

## Usage

1. Select a folder in the macOS Finder and then activate the Alfred File Browser.
2. For me this is setup to be <kbd>Command</kbd><kbd>Command</kbd>.
3. Then you can enter `Copy Names…` and press <kbd>Enter</kbd>.
4. You will be presented with three options:
   1. Copy File Names
   2. Copy Folder Names
   3. Copy File and Folder Names
5. You can filter the options by adding `!file` or `!folder` or `!fil ext` at the end of the Alfred input field.
6. Choose the one you want and hit <kbd>Enter</kbd> and the names will be copied to your clipboard.

## Related

* [More Alfred Workflows](https://github.com/chrisspiegl/alfred-workflows) - My Alfred Workflow Directory
* [alfy](https://github.com/sindresorhus/alfy) - Create Alfred workflows with ease
* [Copy name [1.6]](https://www.alfredforum.com/topic/1733-file-action-16-copy-folderfile-name/) - My workflow was inspired by this workflow by [mcskrzypczak](https://www.alfredforum.com/profile/336-mcskrzypczak/?tab=field_core_pfield_12)
