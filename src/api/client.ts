export type FieldError = {
  field: string; // e.g. "lines.0.debit"
  message: string;
};

export type ApiError = {
  status: number;
  message: string;
  fields?: FieldError[]; // only for validation errors (422)
  code?: string; // only for some errors, e.g. IoT ingest
};

export type RequestContext = {
  tenantId?: string;
  userId?: string;
};

// Empty means "same address as this website",
// which the Vite proxy will forward to the backend later.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function apiRequest<T>(
  path: string,
  context: RequestContext,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  // Every request tells the backend who is asking.
  if (context.tenantId) headers.set("X-Tenant-Id", context.tenantId);
  if (context.userId) headers.set("X-User-Id", context.userId);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  // 204 means "success, nothing to return".
  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

async function parseError(response: Response): Promise<ApiError> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    body = undefined; // the body was not JSON
  }

  const detail = (body as { detail?: unknown } | undefined)?.detail;
  const code = (body as { code?: unknown } | undefined)?.code;

  // Shape 2: validation errors. "detail" is a list of problems.
  if (Array.isArray(detail)) {
    const fields: FieldError[] = detail.map((item) => {
      const problem = item as { loc?: unknown[]; msg?: unknown };
      const loc = Array.isArray(problem.loc) ? problem.loc : [];
      return {
        // Drop the leading "body" so the path matches the form field.
        field: loc.filter((part) => part !== "body").map(String).join("."),
        message: typeof problem.msg === "string" ? problem.msg : "Invalid value",
      };
    });
    return {
      status: response.status,
      message: "Please fix the highlighted fields.",
      fields,
    };
  }

  // Shape 1 and 3: detail is a plain message string.
  return {
    status: response.status,
    message:
      typeof detail === "string"
        ? detail
        : response.statusText || "Request failed",
    code: typeof code === "string" ? code : undefined,
  };
}