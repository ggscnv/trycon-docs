import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

// Slices

export type RichTextSliceDefaultPrimary = {
  content: prismic.RichTextField;
};
export type RichTextSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<RichTextSliceDefaultPrimary>,
  never
>;
export type RichTextSlice = prismic.SharedSlice<"rich_text", RichTextSliceDefault>;

export type CalloutBlockSliceDefaultPrimary = {
  variant: "warning" | "info" | "success";
  title: prismic.KeyTextField;
  body: prismic.KeyTextField;
};
export type CalloutBlockSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<CalloutBlockSliceDefaultPrimary>,
  never
>;
export type CalloutBlockSlice = prismic.SharedSlice<"callout_block", CalloutBlockSliceDefault>;

export type StepListSliceDefaultItem = {
  title: prismic.KeyTextField;
  body: prismic.KeyTextField;
  code: prismic.KeyTextField;
};
export type StepListSliceDefault = prismic.SharedSliceVariation<
  "default",
  Record<string, never>,
  Simplify<StepListSliceDefaultItem>
>;
export type StepListSlice = prismic.SharedSlice<"step_list", StepListSliceDefault>;

export type CardGridSliceDefaultItem = {
  icon: prismic.KeyTextField;
  title: prismic.KeyTextField;
  description: prismic.KeyTextField;
  icon_color: "primary" | "secondary" | "tertiary";
};
export type CardGridSliceDefault = prismic.SharedSliceVariation<
  "default",
  Record<string, never>,
  Simplify<CardGridSliceDefaultItem>
>;
export type CardGridSlice = prismic.SharedSlice<"card_grid", CardGridSliceDefault>;

export type ContactTableSliceDefaultItem = {
  name: prismic.KeyTextField;
  area: prismic.KeyTextField;
  slack: prismic.KeyTextField;
};
export type ContactTableSliceDefault = prismic.SharedSliceVariation<
  "default",
  Record<string, never>,
  Simplify<ContactTableSliceDefaultItem>
>;
export type ContactTableSlice = prismic.SharedSlice<"contact_table", ContactTableSliceDefault>;

export type FaqAccordionSliceDefaultItem = {
  question: prismic.KeyTextField;
  answer: prismic.KeyTextField;
};
export type FaqAccordionSliceDefault = prismic.SharedSliceVariation<
  "default",
  Record<string, never>,
  Simplify<FaqAccordionSliceDefaultItem>
>;
export type FaqAccordionSlice = prismic.SharedSlice<"faq_accordion", FaqAccordionSliceDefault>;

export type PageDocumentDataSlicesSlice =
  | RichTextSlice
  | CalloutBlockSlice
  | StepListSlice
  | CardGridSlice
  | ContactTableSlice
  | FaqAccordionSlice;

// Custom Types

export type DocPageDocumentData = {
  title: prismic.KeyTextField;
  category: prismic.SelectField<"about" | "policies" | "trainings" | "roles">;
  breadcrumb_label: prismic.KeyTextField;
  reading_time: prismic.NumberField;
  badge_label: prismic.KeyTextField;
  slices: prismic.SliceZone<PageDocumentDataSlicesSlice>;
};
export type DocPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
  Simplify<DocPageDocumentData>,
  "doc_page",
  Lang
>;

export type NavigationDocumentDataNavSectionsItem = {
  section_label: prismic.KeyTextField;
  links: prismic.GroupField<{
    label: prismic.KeyTextField;
    link: prismic.LinkField;
    icon: prismic.KeyTextField;
    badge: prismic.KeyTextField;
  }>;
};
export type NavigationDocumentData = {
  nav_sections: prismic.GroupField<Simplify<NavigationDocumentDataNavSectionsItem>>;
};
export type NavigationDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<NavigationDocumentData>,
  "navigation",
  Lang
>;

export type AllDocumentTypes = DocPageDocument | NavigationDocument;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig
    ): prismic.Client<AllDocumentTypes>;
  }
  namespace Content {
    export type {
      DocPageDocument,
      DocPageDocumentData,
      NavigationDocument,
      NavigationDocumentData,
      AllDocumentTypes,
      RichTextSlice,
      CalloutBlockSlice,
      StepListSlice,
      CardGridSlice,
      ContactTableSlice,
      FaqAccordionSlice,
    };
  }
}
