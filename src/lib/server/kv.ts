import { createClient, VercelKV } from '@vercel/kv';
import { env } from '$env/dynamic/private';

let kv: VercelKV | undefined = undefined;

if (env.KV_REST_API_URL && env.KV_REST_API_TOKEN) {
	kv = createClient({
		url: env.KV_REST_API_URL,
		token: env.KV_REST_API_TOKEN
	});
	console.log('Created KV client.');
}

export { kv };
