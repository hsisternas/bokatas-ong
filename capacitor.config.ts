import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.bokatas.mobile.dev',
  appName: 'Bokatas',
  webDir: 'dist',
  backgroundColor: '#f8fafc',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
    },
  },
};

export default config;
