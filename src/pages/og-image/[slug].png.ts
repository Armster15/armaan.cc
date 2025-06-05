import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { generateOgImage } from "$/lib/og-image/generate";
import { formatDate } from "$/lib/date";

interface Props {
  title: string;
  subtitle: string;
}

export async function getStaticPaths() {
  const regularPaths = [
    {
      slug: "home",
      title: "👋 hey, i'm armaan!",
      subtitle: "18 y/o developer building consumer-facing products",
    },
    { slug: "work", title: "My work", subtitle: "Check out what I've built" },
  ].map(({ slug, title, subtitle }) => {
    return {
      params: { slug },
      props: { title, subtitle } satisfies Props,
    };
  });

  const posts = await getCollection("blog");
  const postsPaths = posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
      props: {
        title: post.data.title,
        subtitle: formatDate(post.data.date),
      } satisfies Props,
    };
  });

  return [...postsPaths, ...regularPaths];
}

export async function GET(context: APIContext) {
  const { title, subtitle } = context.props as Props;

  try {
    const image = await generateOgImage({ title, subtitle });

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
