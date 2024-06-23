"use client";
import ArticleCard from "@/src/app/_components/ArticleCard";
import { useArticles } from "@/src/app/_hooks/useArticles";
import LottieLoader from "@/src/app/_components/LottieLoader";

function ArticleList() {
  const { articles, isLoading, hasMore, loadMore } = useArticles();

  return (
    <div className="flex flex-col items-center mb-16 mx-5">
      {articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article: any) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </div>
      )}
      {isLoading && <LottieLoader style={{ width: "60px", height: "60px" }} />}
      {!isLoading && hasMore && (
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-16" onClick={loadMore}>
          Továbbiak betöltése
        </button>
      )}
    </div>
  );
}

export default ArticleList;
