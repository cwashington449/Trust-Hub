import React, { useState, useEffect } from 'react';
import {
  Shield,
  Cookie,
  UserCircle,
  FileText,
  Lock,
  LineChart,
  ChevronRight,
  ExternalLink,
  Bell,
  Fingerprint,
  X,
  Table,
  File,
  FileCog,
  FileCheck,
  FileSearch,
  KeyRound,
  ShieldCheck,
  AlertTriangle,
  Server,
  Mail,
  Phone,
  Link,
} from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

const DataSubjectForm = () => {
  return (
    <iframe 
      src="https://my.datasubject.com/6oqitUFyT8GP2H6v/38386" 
      width="100%" 
      height="600px" 
      frameBorder="0" 
      title="Data Subject Access Request Form"
      style={{ minHeight: '600px' }}
    />
  );
};

interface DocumentTileProps {
  title: string;
  description: string;
  url: string;
  icon: React.ElementType;
}

const DocumentTile = ({ title, description, url, icon: Icon }: DocumentTileProps) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block bg-white rounded-lg shadow hover:shadow-md transition p-6 border border-gray-100 hover:border-indigo-100"
    >
      <div className="flex items-start gap-4">
        <div className="bg-indigo-50 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
          <div className="mt-3 text-indigo-600 text-sm font-medium flex items-center gap-1">
            View document <ExternalLink className="h-3 w-3 ml-1" />
          </div>
        </div>
      </div>
    </a>
  );
};

const sections = [
  {
    id: 'cookies',
    title: 'Cookie Management',
    icon: Cookie,
    description: 'Control your cookie preferences and understand how we use them.',
  },
  {
    id: 'rights',
    title: 'Your Data Rights',
    icon: UserCircle,
    description: 'Understand and exercise your data protection rights.',
  },
  {
    id: 'policies',
    title: 'Privacy Documents',
    icon: FileText,
    description: 'Access our privacy policy and related documentation.',
  },
  {
    id: 'security',
    title: 'Security Measures',
    icon: Lock,
    description: 'Learn about how we protect your data.',
  },
  {
    id: 'transparency',
    title: 'Transparency Reports',
    icon: LineChart,
    description: 'View our latest privacy and security metrics.',
  },
];

interface CookieDisclosure {
  name: string;
  classification: string;
  purpose: string;
  expiry: string;
  provider: string;
}

const privacyDocuments = [
  {
    title: 'Data Licensing Agreement',
    description: 'Terms governing the licensing and use of data between parties.',
    url: 'https://osano.trusthub.com/data-license',
    icon: File,
  },
  {
    title: 'Cookie Policy',
    description: 'Details on how we use cookies and similar technologies on our website.',
    url: 'https://osano.trusthub.com/cookies',
    icon: Cookie,
  },
  {
    title: 'Service Level Statement',
    description: 'Our commitment to service availability and performance standards.',
    url: 'https://osano.trusthub.com/sls',
    icon: FileCog,
  },
  {
    title: 'Terms of Service',
    description: 'Enterprise and Premier Plans terms and conditions for using our services.',
    url: 'https://osano.trusthub.com/terms-enterprise',
    icon: FileCheck,
  },
  {
    title: 'Privacy for Job Applicants',
    description: 'How we handle personal information during the recruitment process.',
    url: 'https://osano.trusthub.com/privacy-job-applicants',
    icon: FileSearch,
  },
];

const securityFeatures = [
  {
    title: 'End-to-End Encryption',
    description: 'All data is encrypted in transit and at rest using industry-standard AES-256 encryption.',
    icon: Lock,
    status: 'active' as const,
  },
  {
    title: 'Multi-Factor Authentication',
    description: 'Secure your account with an additional layer of security beyond just a password.',
    icon: KeyRound,
    status: 'active' as const,
  },
  {
    title: 'SOC 2 Type II Compliance',
    description: 'Our systems and processes are regularly audited for security, availability, and confidentiality.',
    icon: ShieldCheck,
    status: 'active' as const,
  },
  {
    title: 'GDPR Compliance',
    description: 'Our platform is designed to help you meet GDPR requirements for data protection.',
    icon: Shield,
    status: 'active' as const,
  },
  {
    title: 'Vulnerability Scanning',
    description: 'Regular automated scanning of our systems to identify and address potential security vulnerabilities.',
    icon: AlertTriangle,
    status: 'active' as const,
  },
  {
    title: 'Secure Data Centers',
    description: 'Our infrastructure is hosted in SOC 2 compliant data centers with physical security measures.',
    icon: Server,
    status: 'active' as const,
  },
];

const securityCertifications = [
  {
    name: 'SOC 2 Type II',
    description: 'Audited for security, availability, and confidentiality controls',
    status: 'Certified',
    icon: ShieldCheck,
  },
  {
    name: 'ISO 27001',
    description: 'Information security management system certification',
    status: 'Certified',
    icon: Shield,
  },
  {
    name: 'GDPR Compliance',
    description: 'Compliant with EU General Data Protection Regulation',
    status: 'Compliant',
    icon: Shield,
  },
  {
    name: 'CCPA Compliance',
    description: 'Compliant with California Consumer Privacy Act',
    status: 'Compliant',
    icon: Shield,
  },
];

// Data Privacy Officer contact information
const privacyOfficerInfo = {
  name: "Dr. Sarah Johnson",
  title: "Chief Privacy Officer",
  email: "privacy@trusthub.com",
  phone: "+1 (555) 123-4567",
};

// Contact card component for the Data Privacy Officer
const PrivacyOfficerContact = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Data Privacy Officer</h3>
      <div className="space-y-3">
        <div className="bg-indigo-50 p-3 rounded-lg inline-flex items-center justify-center">
          <UserCircle className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="space-y-2">
          <p className="font-medium text-gray-900">{privacyOfficerInfo.name}</p>
          <p className="text-sm text-gray-500">{privacyOfficerInfo.title}</p>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Mail className="h-4 w-4 text-indigo-600" />
            <a href={`mailto:${privacyOfficerInfo.email}`} className="hover:text-indigo-600">
              {privacyOfficerInfo.email}
            </a>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Phone className="h-4 w-4 text-indigo-600" />
            <a href={`tel:${privacyOfficerInfo.phone}`} className="hover:text-indigo-600">
              {privacyOfficerInfo.phone}
            </a>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
            Contact our Data Privacy Officer with any concerns about your personal data or our privacy practices.
          </p>
        </div>
      </div>
    </div>
  );
};

// Privacy Statement Card component
const PrivacyStatementCard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <div className="bg-indigo-50 p-3 rounded-lg">
            <Shield className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Osano</h2>
          <p className="text-gray-600">
            Osano is a leading privacy platform that helps organizations manage consent, data rights, and privacy compliance.
            Our comprehensive solution enables businesses to build trust with their users through transparent privacy practices.
          </p>
          
          <div className="flex items-center gap-4 mt-4">
            <a href="mailto:privacy@osano.com" className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              <Mail className="h-4 w-4 mr-1" />
              privacy@osano.com
            </a>
            <a href="https://www.osano.com/privacy" target="_blank" rel="noopener noreferrer" className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              <Link className="h-4 w-4 mr-1" />
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy Statement</h3>
        <p className="text-gray-600 mb-4">
          At Osano, your privacy is paramount. We're committed to "Visible Privacy" - being transparent about how we collect, use, and protect your personal information.
        </p>
        
        <p className="text-gray-600 mb-4">
          We build trust through transparency and accountability, ensuring you feel confident when using our services. Our approach exceeds regulatory compliance by providing clear information about your privacy rights and meaningful control over your data.
        </p>
        
        <p className="text-gray-600 mb-4">
          We believe strong privacy practices create a secure online environment, fostering relationships built on trust and respect where you feel safe and valued.
        </p>
      </div>
    </div>
  );
};

// Quick Actions component that will be persistent across all tabs
const QuickActions = ({ handleViewUUID, handleManagePreferences }: { 
  handleViewUUID: () => void, 
  handleManagePreferences: () => void 
}) => {
  return (
    <div className="bg-white rounded-lg p-4 sticky top-4 shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Actions</h3>
      <div className="space-y-3">
        <button
          onClick={handleViewUUID}
          className="w-full flex items-center justify-between px-4 py-2 bg-white rounded border border-gray-300 hover:bg-gray-50 text-gray-800"
        >
          <span className="font-medium">View your UUID</span>
          <Fingerprint className="h-4 w-4 text-indigo-600" />
        </button>
        <button
          onClick={handleManagePreferences}
          className="w-full flex items-center justify-between px-4 py-2 bg-white rounded border border-gray-300 hover:bg-gray-50 text-gray-800"
        >
          <span className="font-medium">Update Preferences</span>
          <ExternalLink className="h-4 w-4 text-indigo-600" />
        </button>
      </div>
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('cookies');
  const [isUUIDModalOpen, setIsUUIDModalOpen] = useState(false);
  const [isDisclosureModalOpen, setIsDisclosureModalOpen] = useState(false);
  const [uuid, setUUID] = useState('');
  const [disclosures, setDisclosures] = useState<CookieDisclosure[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.showUUIDModal = (uuid: string) => {
      setUUID(uuid);
      setIsUUIDModalOpen(true);
    };
  }, []);

  const handleManagePreferences = () => {
    if (window.Osano?.cm?.showDrawer) {
      window.Osano.cm.showDrawer('osano-cm-dom-info-dialog-open');
    }
  };

  const handleViewUUID = () => {
    const uuid = localStorage.getItem('osano_consentmanager_uuid');
    if (uuid) {
      setUUID(uuid);
      setIsUUIDModalOpen(true);
    }
  };

  const fetchCookieDisclosures = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://disclosure.api.osano.com/customer/6oqitUFyT8GP2H6v/config/710606b4-96df-4d9d-a998-28a4c478e86e?language=en'
      );
      if (!response.ok) throw new Error('Failed to fetch cookie disclosures');
      const data = await response.json();

      // Transform the data to match the table structure
      const transformedDisclosures = data.map((item: any) => ({
        name: item.name,
        classification: item.classification,
        purpose: item.purpose,
        expiry: item.expiry,
        provider: item.provider,
      }));

      setDisclosures(transformedDisclosures);
      setIsDisclosureModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const sectionContent = {
    cookies: {
      title: 'Cookie Management',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Manage your cookie preferences here. We use cookies to enhance your browsing experience.
          </p>
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Cookie Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={fetchCookieDisclosures}
                className="flex items-center justify-between px-4 py-2 bg-white rounded border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'View Cookie Disclosures'}
                <Table className="h-4 w-4 text-indigo-600" />
              </button>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
          </div>
        </div>
      ),
    },
    rights: {
      title: 'Your Data Rights',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            By using the form below, you can exercise your right to know and obtain communication with regard to the purposes for which your personal data is processed, 
            where possible the period for which your personal data is processed, the recipients of the personal data, the logic involved in any automatic personal data processing and, at 
            least when based on profiling, the consequences of such processing.
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Data Subject Access Request</h3>
            <DataSubjectForm />
          </div>
        </div>
      ),
    },
    policies: {
      title: 'Privacy Documents',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Access and download our privacy policy and other related documents. These documents outline our commitments, 
            practices, and legal terms regarding data privacy and protection.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {privacyDocuments.map((doc, index) => (
              <DocumentTile 
                key={index}
                title={doc.title}
                description={doc.description}
                url={doc.url}
                icon={doc.icon}
              />
            ))}
          </div>
        </div>
      ),
    },
    security: {
      title: 'Security Measures',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            We implement multiple layers of security to protect your data and ensure the integrity of our platform.
            Below are the key security features and certifications that safeguard your information.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-5 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <feature.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{feature.title}</h3>
                      {feature.status === 'active' && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Certifications & Compliance</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certification
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {securityCertifications.map((cert, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-50 rounded-full">
                          <cert.icon className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{cert.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{cert.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {cert.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    transparency: {
      title: 'Transparency Reports',
      content: (
        <p className="text-gray-600">View our latest transparency reports to see how we handle privacy and security.</p>
      ),
    },
  };

  function SectionContent({ sectionId }: { sectionId: string }) {
    const section = sectionContent[sectionId as keyof typeof sectionContent];
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
        <div className="prose max-w-none">{section.content}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#180d43] text-white">
      {/* Header */}
      <header className="bg-[#180d43] shadow-md border-b border-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="h-6 w-6 text-indigo-300" />
              Trust Hub
            </h1>
            <div className="flex items-center">
              <button className="text-indigo-200 hover:text-white transition-colors">
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy Statement Card - Horizontally spans the document */}
        <PrivacyStatementCard />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
                    activeSection === section.id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className={`text-sm ${activeSection === section.id ? 'text-indigo-100' : 'text-gray-500'}`}>
                        {section.description}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6 text-gray-900">
            <SectionContent sectionId={activeSection} />
          </div>

          {/* Quick Actions and Privacy Officer Contact - Now on the right side and persistent */}
          <div className="space-y-4">
            <QuickActions 
              handleViewUUID={handleViewUUID} 
              handleManagePreferences={handleManagePreferences} 
            />
            <PrivacyOfficerContact />
          </div>
        </div>
      </main>

      {/* UUID Modal */}
      <Modal isOpen={isUUIDModalOpen} onClose={() => setIsUUIDModalOpen(false)}>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Unique Identifier</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 font-mono text-sm text-gray-800 break-all border border-gray-200">{uuid}</div>
        <p className="text-gray-600 text-sm">
          This UUID is your unique identifier in our system. If you ever need to contact us about your personal
          data, please provide this UUID to help us locate and process your information more efficiently.
        </p>
      </Modal>

      {/* Cookie Disclosures Modal */}
      <Modal isOpen={isDisclosureModalOpen} onClose={() => setIsDisclosureModalOpen(false)}>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Cookie Disclosures</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classification</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {disclosures.map((cookie, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cookie.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cookie.classification}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cookie.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cookie.expiry}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cookie.provider}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}

export default App;
