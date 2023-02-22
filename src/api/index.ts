import { Country } from "./types";

/**
 * Documentation: https://restcountries.com/
 * version: 3.1
 */
class API {
    static version = "v3.1";
    static apiBase = "https://restcountries.com";
    static root = new URL(this.apiBase + "/" + this.version);
    
    async getJSON<T>(url: URL | string) {
        const response = await fetch(url, {
            headers: {
                "Accept": "application/json",
            },
        });

        let body: T | null = null;
        if (response.headers.get('content-type')?.includes('json')) {
            body = await response.json().catch(e => null);
        }

        return {
            ok: response.ok,
            statusCode: response.status,
            body,
            response,
        };
    }

    async getAll() {
        const url = new URL('all', API.root);
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
