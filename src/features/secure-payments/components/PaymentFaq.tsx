
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const PaymentFaq = () => {
  return (
    <div className="mb-16">
      <h3 className="text-xl font-medium mb-6">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
          <AccordionContent>
            Yes, all payments are processed through Razorpay, which uses industry-standard
            encryption and security protocols. We never store your payment details
            on our servers.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>When will I be charged for my shipment?</AccordionTrigger>
          <AccordionContent>
            You'll be charged only when you confirm your shipment booking. 
            The payment is processed immediately to secure your booking.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I get a refund if I cancel my shipment?</AccordionTrigger>
          <AccordionContent>
            Refund policies depend on when you cancel. Cancellations made 24 hours
            before pickup are eligible for a full refund. Later cancellations may be 
            subject to a cancellation fee.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Do you offer any payment plans for large shipments?</AccordionTrigger>
          <AccordionContent>
            For large shipments or business accounts, we offer flexible payment options
            including partial payments and credit terms. Please contact our sales team
            for more information.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>How long does payment processing take?</AccordionTrigger>
          <AccordionContent>
            Card payments and UPI transactions are processed instantly. Bank transfers
            may take up to 24 hours to reflect in our system, depending on your bank.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
