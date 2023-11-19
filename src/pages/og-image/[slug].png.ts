import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { generateOgImage } from "$/lib/generate-og-image";

interface Props {
  title: string;
  pubDate: Date;
}

export async function GET(context: APIContext) {
  const { title, pubDate } = context.props as Props;

  try {
    const image = await generateOgImage({ title, date: pubDate });

    return new Response(image, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (err) {
    console.error(err);

    return new Response("An unexpected error occurred", {
      status: 500,
    });
  }
}

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
      props: {
        title: post.data.title,
        pubDate: post.data.date,
      },
    };
  });
  return paths;
}
