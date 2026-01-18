export type FieldErrors = Record<string, string[]>;

export type ApiError = {
  message?: string;
  status?: number;
  fieldErrors?: FieldErrors;
};

export type ApiResponse<T = unknown> = {
  data: T | null;
  status?: number;
  message?: string;
  error?: ApiError;
};
