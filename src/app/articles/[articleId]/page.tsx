import { getArticle } from "@/src/app/_lib/api";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import Timer from "@/public/timer.svg";
import BackButton from "@/public/back_btn.svg";
import Link from "next/link";

export default async function Page({ params }: any) {
  const { title, description, imageUrl, readingTime } = await getArticle(params.articleId);
  const sanitizedDescription = sanitizeHtml(description);

  return (
    <div className="flex flex-col items-center">
      <Image
        src={imageUrl}
        width={600}
        height={400}
        alt="Article Image"
        className="w-11/12 h-96 object-cover rounded-b-2xl"
      />
      <div className="relative mx-10">
        <p className="flex justify-center align-middle bg-red-500 rounded-md px-2 py-1  text-center absolute -top-16 right-20">
          <Image src={Timer} width={10} height={10} alt="Timer" />
          <span className="font-thin text-white text-xs p-1">Olvasásidő: {readingTime} perc</span>
        </p>
        <div className="flex flex-col gap-4 mt-8 max-w-4xl mx-auto w-full">
          <div className="flex flex-col items-center gap-6">
            <Link href="/articles">
              {" "}
              <Image src={BackButton} width={30} height={30} alt="Back Button" />
            </Link>
            <h1 className="text-4xl mb-5 mt-5 text-black font-bold">{title}</h1>
          </div>

          <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></div>
        </div>
      </div>
    </div>
  );
}
