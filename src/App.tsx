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

const stats = [
  { 
    id: 1, 
    name: 'Global Privacy Control Enabled',
    value: null,
    render: () => {
      const isEnabled = navigator.globalPrivacyControl === true;
      return (
        <div className={`text-4xl font-bold ${isEnabled ? 'text-green-600' : 'text-red-600'} mb-2`}>
          {isEnabled ? 'YES' : 'NO'}
        </div>
      );
    }
  },
  { 
    id: 2, 
    name: 'Osano Version',
    value: null,
    render: () => {
      const version = window.Osano?.cm?.cmpVersion || 'N/A';
      return (
        <>
          <div className="text-4xl font-bold text-indigo-600 mb-2">{version}</div>
          <a 
            href="https://docs.osano.com/hc/en-us/categories/21084645441300-Release-Notes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 hover:text-indigo-800 underline"
          >
            View Release Notes
          </a>
        </>
      );
    }
  }
];

const sections = [
  {
    id: 'privacy',
    title: 'Our Commitment to Privacy',
    icon: Shield,
    description: 'Learn about our dedication to protecting your data and privacy rights.',
  },
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

function App() {
  const [activeSection, setActiveSection] = useState('privacy');
  const [isUUIDModalOpen, setIsUUIDModalOpen] = useState(false);
  const [isDisclosureModalOpen, setIsDisclosureModalOpen] = useState(false);
  const [uuid, setUUID] = useState('');
  const [disclosures, setDisclosures] = useState<CookieDisclosure[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.globalPrivacyControl === true) {
      console.log("Global Privacy Control is enabled.");
    } else {
      console.log("Global Privacy Control is not enabled or not supported.");
    }
  }, []);

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
    privacy: {
      title: 'Our Commitment to Privacy',
      content: (
        <>
          <p className="text-gray-600 mb-4">
            We believe in complete transparency when it comes to your data. Our visible privacy approach
            means you always know what data we collect, how we use it, and why it matters.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleViewUUID}
                className="flex items-center justify-between px-4 py-2 bg-white rounded border hover:bg-gray-50"
              >
                View your UUID
                <Fingerprint className="h-4 w-4" />
              </button>
              <button
                onClick={handleManagePreferences}
                className="flex items-center justify-between px-4 py-2 bg-white rounded border hover:bg-gray-50"
              >
                Update Preferences
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Privacy Principles</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Transparency in all data collection and processing</li>
            <li>User control over personal data</li>
            <li>Strong security measures to protect your information</li>
            <li>Regular updates on our privacy practices</li>
          </ul>
        </>
      ),
    },
    cookies: {
      title: 'Cookie Management',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Manage your cookie preferences here. We use cookies to enhance your browsing experience.
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Cookie Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={fetchCookieDisclosures}
                className="flex items-center justify-between px-4 py-2 bg-white rounded border hover:bg-gray-50"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'View Cookie Disclosures'}
                <Table className="h-4 w-4" />
              </button>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
          </div>
        </div>
      ),
    },
    rights: {
      title: 'Your Data Rights',
      content: <p className="text-gray-600">Learn about your rights regarding your personal data and how to exercise them.</p>,
    },
    policies: {
      title: 'Privacy Documents',
      content: <p className="text-gray-600">Access and download our privacy policy and other related documents.</p>,
    },
    security: {
      title: 'Security Measures',
      content: <p className="text-gray-600">Explore the security measures we have in place to protect your data.</p>,
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-6 w-6 text-indigo-600" />
              Trust Hub
            </h1>
            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Bell className="h-5 w-5" />
              </button>
              <button
                onClick={handleManagePreferences}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Manage Preferences
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md transition">
              {stat.render ? (
                stat.render()
              ) : (
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
              )}
              <div className="text-sm text-gray-500">
                {stat.name}
                {stat.subtext && <span className="block">{stat.subtext}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation */}
          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
                    activeSection === section.id ? 'bg-indigo-50 text-indigo-700' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className="text-sm text-gray-500">{section.description}</div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <SectionContent sectionId={activeSection} />
          </div>
        </div>
      </main>

      {/* UUID Modal */}
      <Modal isOpen={isUUIDModalOpen} onClose={() => setIsUUIDModalOpen(false)}>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Unique Identifier</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 font-mono text-sm break-all">{uuid}</div>
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
