/// <reference types="vite/client" />

interface Window {
  Osano?: {
    cm?: {
      showDrawer: (arg: string) => void;
      cmpVersion?: string;
    };
  };
  showUUIDModal: (uuid: string) => void;
}

interface Navigator {
  globalPrivacyControl?: boolean;
}
