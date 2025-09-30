
import { Shield, Lock, Server, Database, CheckCircle2 } from 'lucide-react';

type SecuritySectionProps = {
  title: string;
  icon: typeof Shield;
  description: string;
  features: {
    title: string;
    description: string;
    icon: typeof Lock;
  }[];
};

export const SecuritySection = ({ title, icon: Icon, description, features }: SecuritySectionProps) => {
  return (
    <section>
      <div className="flex items-center mb-4">
        <Icon className="h-6 w-6 text-primary mr-3" />
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="bg-card border rounded-lg p-6">
        <p className="mb-4">{description}</p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="mt-1 mr-3 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SecuritySections = () => {
  return (
    <div className="space-y-12">
      <SecuritySection
        title="Payment Processing Security"
        icon={Shield}
        description="Our payment system utilizes industry-standard encryption and security protocols to ensure 
          that your financial information remains protected during transactions. We've implemented 
          multiple safeguards to prevent unauthorized access and potential fraud."
        features={[
          {
            title: "End-to-End Encryption",
            description: "All transaction data is encrypted using TLS protocol with 256-bit encryption, making it virtually impossible for unauthorized parties to intercept your information.",
            icon: Lock
          },
          {
            title: "Secure Infrastructure",
            description: "Our payment servers are hosted in secure facilities with multiple physical and digital security measures to protect against breaches.",
            icon: Server
          }
        ]}
      />
      
      <SecuritySection
        title="Card Payment Security"
        icon={Database}
        description="When you use a credit or debit card with our service, your card details are never 
          stored on our servers. We work with PCI DSS compliant payment processors to ensure 
          your card information is handled according to strict industry standards."
        features={[
          {
            title: "No Card Storage",
            description: "We do not store full credit card numbers on our servers. Only tokenized references are kept for recurring transactions where authorized.",
            icon: Database
          },
          {
            title: "3D Secure Authentication",
            description: "Additional verification steps provided by your card issuer help confirm your identity and protect against unauthorized transactions.",
            icon: CheckCircle2
          }
        ]}
      />
    </div>
  );
};
