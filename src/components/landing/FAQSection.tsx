'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}
export default function FAQSection() {
  const faqs: FAQ[] = [
    {
      question: 'Question 1',
      answer: 'Answer 1',
    },
    {
      question: 'Question 2',
      answer: 'Answer 2',
    },
    {
      question: 'Question 3',
      answer: 'Answer 3',
    },
  ];
  return (
    <div className="mx-5 mt-5 md:mx-auto md:mt-16 md:max-w-4xl">
      <h3 className="text-lg text-primary">FAQ</h3>
      <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
      <div className="my-5 flex flex-col items-stretch justify-start gap-4 md:flex-row md:items-stretch md:justify-center">
        <Accordion type="single" collapsible className="w-full text-start">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
