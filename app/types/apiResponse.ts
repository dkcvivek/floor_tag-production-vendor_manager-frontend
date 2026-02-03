export interface ApiResponse<T> {
  message: string;
  error_status: boolean;
  status: number;
  data: T;
}
