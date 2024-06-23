import ArticleList from "@/src/app/_components/ArticleList";

export const metadata = {
  title: "Blog",
};

export default function Page({}) {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <h1 className="text-4xl mt-10 mb-10 text-accent-400 font-bold mx-10">Legfrissebb cikkeink</h1>

      <ArticleList />
    </div>
  );
}
