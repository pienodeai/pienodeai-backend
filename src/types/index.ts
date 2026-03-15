export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
}

export interface ApiError {
  error: string;
  message: string;
  details?: unknown;
  requestId?: string;
}
