import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import { dev } from '$app/environment';

const cacheDir = './.cache';
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
	if (dev) {
		const cacheKey = createHash('md5').update(url).digest('hex');
		const cacheFilePath = path.join(cacheDir, cacheKey);

		try {
			await fsPromises.mkdir(cacheDir, { recursive: true });

			if (await isCacheValid(cacheFilePath)) {
				const cachedText = await fsPromises.readFile(cacheFilePath, 'utf8');
				console.log(`Returned from cache: ${url}`);
				return cachedText;
			}
		} catch (error) {
			// Cache miss or error, continue to fetch data
		}

		const response = await fetch(url);
		const text = await response.text();

		await fsPromises.writeFile(cacheFilePath, text);
		console.log(`Fetched from webpage: ${url}`);
		return text;
	} else {
		const response = await fetch(url);
		const text = await response.text();

		return text;
	}
}
