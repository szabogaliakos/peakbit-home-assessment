"use client";
import { useEffect, useState } from "react";

const BASE_URL = "https://trial.peakbit.tech/api";

export function useArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/articles/list?page=${page}&pageSize=12`);

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const { list, meta } = await response.json();

        if (list && articles.length <= 0) {
          setArticles(() => list);
        }

        if (list && articles.length > 0) {
          setArticles((prevArticles) => [...prevArticles, ...list]);
        }

        if (meta && meta.currentPage >= meta.pageCount) {
          setHasMore(false);
          setPage(() => meta.pageCount);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { articles, isLoading, hasMore, loadMore, error };
}
