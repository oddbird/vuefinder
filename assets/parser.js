import matter from "gray-matter";

export async function parseData(pageRaw) {
  const data = {
    slides: [],
  };

  pageRaw.split("\n<!-- slide -->\n").forEach(function (partRaw, index) {
    partRaw = partRaw.trimLeft();
    const part = matter(partRaw, { excerpt_separator: "<!-- more -->" });
    part.content = part.content.trimLeft();
    part.excerpt = part.excerpt.trimLeft();

    if (index === 0) {
      data.meta = part.data;
      data.meta.content = part.content;
      data.meta.excerpt = part.excerpt;
    } else {
      part.id = `slide-${index}`;
      part.style = (part.data.style) ? part.data.style : {};
      part.alt = (part.data.alt) ? part.data.alt : null;
      data.slides.push(part);
    }
  });

  return data;
}
