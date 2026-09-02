import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.bokatas.mobile.dev',
  appName: 'Bokatas',
  webDir: 'dist',
  backgroundColor: '#f8fafc',
  plugins: {
    StatusBar: {
      // Let the header's safe-area background paint behind the iOS status bar.
      // Keeping this false leaves UIKit's default black band above the WebView.
      overlaysWebView: true,
    },
  },
};

export default config;
