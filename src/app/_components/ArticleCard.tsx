import Link from "next/link";
import Timer from "@/public/timer.svg";
import Image from "next/image";
import ImageFallback from "@/src/app/_components/ImageFallback";
import DefaultImage from "@/public/default.jpg";

function ArticleCard({ article }: any) {
  const { id, title, imageUrl, readingTime } = article;

  return (
    <Link href={`/articles/${id}`}>
      <div className="relative">
        <ImageFallback
          src={imageUrl}
          width={600}
          height={400}
          alt="Article Image"
          className="w-full h-48 object-cover rounded-lg"
          fallbackSrc={DefaultImage}
        ></ImageFallback>
        <div className="p-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="flex justify-center bg-red-500 rounded-full w-20 h-6 text-center absolute top-2 right-2">
            <Image src={Timer} width={10} height={10} alt="Timer" />
            <span className="font-thin text-white text-xs p-1">{readingTime} perc</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
