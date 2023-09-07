interface ApiPagenationResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
}

interface ApiResponse<T> {
  message?: string;
  data?: T | ApiPagenationResponse<T>;
}

export { ApiResponse, ApiPagenationResponse };
