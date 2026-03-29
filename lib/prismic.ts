import * as prismic from "@prismicio/client";

export const repositoryName = "trycon-docs";

export function createClient(config?: prismic.ClientConfig) {
  return prismic.createClient(repositoryName, config);
}
