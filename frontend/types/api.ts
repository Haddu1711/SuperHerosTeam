export type FieldErrors = Record<string, string[]>;

export type ApiError = {
  message?: string;
  status?: number;
  fieldErrors?: FieldErrors;
};

export type ApiResponse<T = unknown> = {
  data: T | null;
  message?: string;
  error?: ApiError;
};
