import { Country } from './types';

/**
 * Documentation: https://restcountries.com/
 * version: 3.1
 * TODO: enable cache revalidation based on response time (note: date header is not available)
 */
export class API {
  static version = 'v3.1';
  static apiBase = 'https://restcountries.com';
  static root = new URL(this.apiBase + '/' + this.version);
  useCache = true;
  cacheName = 'restcountries.com/v3.1';

  async getJSON<T>(url: URL | string | RequestInfo, force = false) {
    const response = await this.getCachedResource(url, this.cacheName, {}, force);

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
    force = false,
  ) {
    let response: Response | undefined;
    let cache: Cache | undefined;

    if (window.CacheStorage && this.useCache) {
      cache = await caches.open(cacheName);
      if (!force) {
        response = await cache.match(url, searchOptions);
        if (response) return response;
      }
    }

    // get resource and store it
    response = await fetch(url);
    if (window.CacheStorage && cache && this.useCache) {
      await cache.put(url, response);
      // cache.put(url, response) automatically reads response body, and because of that behavior #1 (`Bug: on first load countries list is empty`) happens
      response = (await cache.match(url, searchOptions)) || response;
    }
    return response;
  }

  async getAll(force = false) {
    const url = new URL(`/${API.version}/all`, API.root);
    const response = await this.getJSON<Country[]>(url, force);

    if (response.body instanceof Array) {
      return response.body;
    } else {
      return [];
    }
  }
}

export const api = new API();

export default api;
