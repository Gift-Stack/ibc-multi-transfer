export const api = async <T>(url: string, init?: RequestInit): Promise<T> => {
  return fetch(url, init).then(async (response) => {
    const json = await response.json();
    if (!response.ok) {
      if (json.code || json.message) {
        throw new Error(json.message);
      }
      throw new Error(response.statusText);
    }
    return json as Promise<T>;
  });
};
