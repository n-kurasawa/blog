import { remark } from "remark";
import remarkBreaks from "remark-breaks";
import html from "remark-html";

export default async function markdownToHtml(
  markdown: string
): Promise<string> {
  const result = await remark().use(html).use(remarkBreaks).process(markdown);
  return result.toString();
}
