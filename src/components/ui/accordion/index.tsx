import {
  Accordion,
  AccordionContent,
  AccordionContentProps,
  AccordionPanel,
  AccordionProps,
  AccordionTitle,
} from "flowbite-react";

interface IVnAccordionProps extends AccordionProps {}
export function VnAccordion({ children }: IVnAccordionProps) {
  return <Accordion>{children}</Accordion>;
}

interface IAccordionPanelProps extends AccordionContentProps {
  title: string;
}

export function VnAccordionPanel({ children, title }: IAccordionPanelProps) {
  return (
    <AccordionPanel>
      <AccordionTitle theme={{ flush: { off: "focus:ring-0" } }}>
        {title}
      </AccordionTitle>
      <AccordionContent>{children}</AccordionContent>
    </AccordionPanel>
  );
}
