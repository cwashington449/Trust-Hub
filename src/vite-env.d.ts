/// <reference types="vite/client" />

interface OsanoDrawer {
  showDrawer: (id: string) => void;
  cmpVersion: string;
}

interface Window {
  Osano: {
    cm: OsanoDrawer;
  };
  showUUIDModal: (uuid: string) => void;
}

interface Navigator {
  globalPrivacyControl?: boolean;
}
