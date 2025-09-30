
import { FileCheck, Shield } from 'lucide-react';

export const CertificationsSection = () => {
  return (
    <section>
      <div className="flex items-center mb-4">
        <FileCheck className="h-6 w-6 text-primary mr-3" />
        <h2 className="text-2xl font-semibold">Our Security Certifications</h2>
      </div>
      <div className="bg-card border rounded-lg p-6">
        <p className="mb-6">
          Our payment systems undergo regular security audits and comply with international
          security standards to ensure the highest level of protection for your transactions.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['PCI DSS', 'ISO 27001', 'GDPR Compliant', 'SOC 2'].map((cert) => (
            <div key={cert} className="text-center p-4 border rounded-lg">
              <div className="mb-2 mx-auto h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <p className="font-medium">{cert}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
