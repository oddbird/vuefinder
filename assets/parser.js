import matter from "gray-matter";

export async function parseData(pageRaw) {
  const data = {
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
      data.meta = part.data;
    } else {
      data.slides.push(part);
    }
  });

  return data;
}
