import { Country } from './types';

/**
 * Documentation: https://restcountries.com/
 * version: 3.1
 * TODO: enable cache revalidation based on response time (note: date header is not available)
 */
class API {
  static version = 'v3.1';
  static apiBase = 'https://restcountries.com';
  static root = new URL(this.apiBase + '/' + this.version);
  useCache = true;
  cacheName = 'restcountries.com/v3.1';

  async getJSON<T>(url: URL | string | RequestInfo) {
    let response: Response;
    if (this.useCache) {
      response = await this.getCachedResource(url, this.cacheName, {});
    } else {
      response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });
    }

    let body: T | null = null;
    if (response.headers.get('content-type')?.includes('json')) {
      body = await response.json().catch((_) => null);
    }

    return {
      ok: response.ok,
      statusCode: response.status,
      body,
      response,
    };
  }

  async getCachedResource(
    url: string | URL | RequestInfo,
    cacheName: string,
    searchOptions: CacheQueryOptions,
  ) {
    const cache = await caches.open(cacheName);
    let response = await cache.match(url, searchOptions);
    if (response) return response;

    // get resource and store it
    response = await fetch(url);
    await cache.put(url, response);
    return response;
  }

  async getAll() {
    const url = new URL(`/${API.version}/all`, API.root);
    const response = await this.getJSON<Country[]>(url);

    if (response.body instanceof Array) {
      return response.body;
    } else {
      return [];
    }
  }
}

const api = new API();

export default api;
