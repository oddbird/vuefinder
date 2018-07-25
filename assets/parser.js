import matter from "gray-matter";

export async function parseData(pageRaw, key, slug, src) {
  const page = {
    route: `/${key}/${slug}`,
    key: key,
    slug: slug,
    src: src,
    slides: [],
  };

  pageRaw.split("\n<!-- slide -->\n").forEach(function (partRaw, index) {
    partRaw = partRaw.trimLeft();
    const part = matter(partRaw, { excerpt_separator: "<!-- more -->" });
    part.id = `slide-${index}`;
    part.content = part.content.trimLeft();
    part.excerpt = part.excerpt.trimLeft();
    part.style = (part.data.style) ? part.data.style : {};
    part.alt = (part.data.alt) ? part.data.alt : null;

    if (index === 0) {
      page.meta = {
        title: part.data.title,
        subtitle: part.data.subtitle,
        excerpt: part.excerpt,
        content: part.content,
        shuffle: part.data.shuffle,
        view: part.data.view ? part.data.view : 'list',
        pin: part.data.pin ? part.data.pin : 1,
      };
    } else {
      page.slides.push(part);
    }
  });

  return page;
}
