import * as prismic from "@prismicio/client";

export const repositoryName = "trycon-docs";

export function createClient(config?: prismic.ClientConfig) {
  return prismic.createClient(repositoryName, {
    routes: [{ type: "doc_page", path: "/:category/:uid" }],
    ...config,
  });
}
