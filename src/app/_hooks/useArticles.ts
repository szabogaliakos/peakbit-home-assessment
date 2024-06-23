"use client";
import { useEffect, useState } from "react";

const BASE_URL = "https://trial.peakbit.tech/api";

export function useArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/articles/list?page=${page}&pageSize=12`);
        const { list, meta } = await response.json();

        if (list && articles.length === 0) {
          setArticles(() => list);
        }

        if (list && articles.length > 0) {
          setArticles((prevArticles) => (page === 1 ? list : [...prevArticles, ...list]));
        }

        if (meta && meta.currentPage >= meta.pageCount) {
          setHasMore(false);
          setPage(() => meta.pageCount);
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
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

  return { articles, isLoading, hasMore, loadMore };
}
