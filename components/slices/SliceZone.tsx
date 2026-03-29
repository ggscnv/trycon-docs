import type { PageDocumentDataSlicesSlice } from "@/prismicio-types";
import RichText from "./RichText";
import CalloutBlock from "./CalloutBlock";
import StepList from "./StepList";
import CardGrid from "./CardGrid";
import ContactTable from "./ContactTable";
import FaqAccordion from "./FaqAccordion";

export default function SliceZone({ slices }: { slices: PageDocumentDataSlicesSlice[] }) {
  return (
    <>
      {slices.map((slice, i) => {
        switch (slice.slice_type) {
          case "rich_text":
            return <RichText key={i} slice={slice} />;
          case "callout_block":
            return <CalloutBlock key={i} slice={slice} />;
          case "step_list":
            return <StepList key={i} slice={slice} />;
          case "card_grid":
            return <CardGrid key={i} slice={slice} />;
          case "contact_table":
            return <ContactTable key={i} slice={slice} />;
          case "faq_accordion":
            return <FaqAccordion key={i} slice={slice} />;
          default:
            return null;
        }
      })}
    </>
  );
}
