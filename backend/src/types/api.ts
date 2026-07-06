export type ApiResponse<TData> = {
  data: TData;
  message?: string;
};

export type PaginatedResponse<TData> = ApiResponse<TData[]> & {
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

