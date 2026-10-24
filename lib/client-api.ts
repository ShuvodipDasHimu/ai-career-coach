/** POST JSON and return parsed JSON; throws Error(message) using the server's `error` field. */
export async function postJson<T>(url: string, body: unknown, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  return parse<T>(res);
}

export async function postForm<T>(url: string, form: FormData, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { method: "POST", body: form, signal });
  return parse<T>(res);
}

async function parse<T>(res: Response): Promise<T> {
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON body */
  }
  if (!res.ok) {
    const msg = (data as { error?: string } | null)?.error;
    throw new Error(msg || `Request failed (${res.status})`);
  }
  return data as T;
}
