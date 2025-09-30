
import { CheckCircle2 } from 'lucide-react';

export const SecurityResponsibilitySection = () => {
  return (
    <section>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h3 className="font-semibold mb-3">Your Security Responsibility</h3>
        <p className="text-sm mb-4">
          While we implement comprehensive security measures, your vigilance is also important.
          Here are some tips to help keep your payment information secure:
        </p>
        
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
            <span>Keep your account credentials confidential and use strong, unique passwords</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
            <span>Verify that you're on our official website before entering payment details</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
            <span>Monitor your transaction history and report any unauthorized activities</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
            <span>Ensure your devices have up-to-date security software</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
