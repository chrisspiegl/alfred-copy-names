import fs from 'node:fs';
import path from 'node:path';
import alfy from 'alfy';
import {filterOutput, findFilter, isFileAction} from './src/utils.js';

const {inputWithoutFilter, foundFilter: filter} = findFilter(alfy.input);
const input = inputWithoutFilter
  .replaceAll("\t", "\n")
  .split("\n")
  .map((element) => element.trim());

const options = [
	{
		prefix: 'Copy File Names',
		match: 'copy file name names filenames filename files',
		action: filepath => {
			const stat = fs.lstatSync(filepath);
			if (!stat.isFile()) {
				return false;
			}

			const {name} = path.parse(filepath); //=> "hello"
			const {ext} = path.parse(filepath); //=> ".html"
			return `${name}${ext}`;
		},
	},
	{
		prefix: 'Copy File Names (no extension)',
		match: 'copy file name names filenames filename files without no extension',
		action: filepath => {
			const stat = fs.lstatSync(filepath);
			if (!stat.isFile()) {
				return false;
			}

			const {name} = path.parse(filepath); //=> "hello"
			return `${name}`;
		},
	},
	{
		prefix: 'Copy Folder Names',
		match: 'copy folder name names foldernames foldername folders',
		action: filepath => {
			const stat = fs.lstatSync(filepath);
			if (!stat.isDirectory()) {
				return false;
			}

			return path.basename(filepath);
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
		action: filepath => {
			const stat = fs.lstatSync(filepath);
			if (stat.isDirectory()) {
				return path.basename(filepath);
			}

			const {name} = path.parse(filepath); //=> "hello"
			return `${name}`;
		},
	},
];

function run(input) {
	if (!isFileAction(input)) {
		return [
			{
				title: 'Input must be valid and existing file(s) or folder(s)',
				valid: false,
			},
		];
	}

	return options.map(options => {
		const files = input.map(filepath => options.action(filepath)).filter(element => Boolean(element));
		return {
			title: `${options.prefix}: ${files}`,
			subtitle: 'Copy to clipboard',
			match: options.match,
			arg: files.join('\n'),
		};
	});
}

const output = run(input);
if (output.length > 0) {
	alfy.output(filter ? filterOutput(filter, output) : output);
} else {
	alfy.output([
		{
			title: 'Nothing to process…',
			subtitle: 'No files selected?',
		},
	]);
}
