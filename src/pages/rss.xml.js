import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import { getCollection } from "astro:content";

const base = import.meta.env.BASE_URL;

export async function GET() {
  const notes = await getCollection("notes");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE + "/" + base,
    items: notes.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `${base}/notes/${post.slug}/`,
    })),
  });
}
