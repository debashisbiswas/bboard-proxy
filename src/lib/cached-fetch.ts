import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';

const cacheDir = './.cache'; // Cache directory
const cacheDuration = 300000; // Cache duration in milliseconds (5 minutes)

async function isCacheValid(cacheFilePath: string): Promise<boolean> {
	try {
		const stats = await fsPromises.stat(cacheFilePath);
		const fileAge = Date.now() - stats.mtimeMs;
		return fileAge < cacheDuration;
	} catch (error) {
		return false;
	}
}

export async function cachedFetchPageContent(url: string): Promise<string> {
	const cacheKey = createHash('md5').update(url).digest('hex');
	const cacheFilePath = path.join(cacheDir, cacheKey);

	try {
		// Ensure cache directory exists
		await fsPromises.mkdir(cacheDir, { recursive: true });

		// Check cache
		if (await isCacheValid(cacheFilePath)) {
			const cachedText = await fsPromises.readFile(cacheFilePath, 'utf8');
			return cachedText;
		}
	} catch (error) {
		// Cache miss or error, continue to fetch data
	}

	const response = await fetch(url);
	const text = await response.text();

	await fsPromises.writeFile(cacheFilePath, text);
	return text;
}
