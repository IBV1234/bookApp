export async function fetcher(url: string, options?: RequestInit):Promise<unknown> {
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            console.error(`Failed to fetch: ${res.status} ${res.statusText}`);
            return null;
        }
        return res.json();
    }catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }

}