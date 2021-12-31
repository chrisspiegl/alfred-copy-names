import fs from 'node:fs';
import alfy from 'alfy';

export function findFilter(input) {
	const regexFilter = /(!(?<filter>[a-zA-Z ]*))?$/;
	const regexMatches = input.trim().match(regexFilter);
	const foundFilter = regexMatches?.groups.filter;
	const inputWithoutFilter = input.trim().replace(regexFilter, '');
	return {
		inputWithoutFilter,
		foundFilter,
	};
}

export function filterOutput(filter, output) {
	const filterSplit = filter.split(' ');
	for (const filter of filterSplit) {
		output = alfy.matches(filter, output, 'match');
	}

	return output;
}

export function isFileAction(input) {
	input = Array.isArray(input) ? input : [input];
	const filePaths = input.map(filepath => {
		if (filepath.slice(0, 1) !== '/') {
			return false;
		}

		const stat = fs.lstatSync(filepath.trim());
		if (stat.isFile() || stat.isDirectory()) {
			return true;
		}

		return false;
	})
		.filter(element => Boolean(element));
	return filePaths.length > 0;
}
