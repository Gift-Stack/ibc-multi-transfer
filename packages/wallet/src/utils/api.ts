export const api = async <T>(url: string, init?: RequestInit): Promise<T> => {
  return fetch(url, init).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
};
