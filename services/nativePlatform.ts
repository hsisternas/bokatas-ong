import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

export const isNativePlatform = () => Capacitor.isNativePlatform();

/** Keeps native status chrome aligned with Bokatas without affecting the web/PWA. */
export const syncNativeTheme = async (theme: 'light' | 'dark') => {
  if (!isNativePlatform()) return;
  const platform = Capacitor.getPlatform();
  // iOS needs the WebView to paint through the status area for a seamless
  // Dynamic Island/notch treatment. Android applies setBackgroundColor only
  // when its system bar is not overlaid by the WebView.
  await StatusBar.setOverlaysWebView({ overlay: platform === 'ios' });
  await StatusBar.setStyle({ style: theme === 'dark' ? Style.Dark : Style.Light });
  if (platform === 'android') {
    await StatusBar.setBackgroundColor({ color: theme === 'dark' ? '#0b1220' : '#f8fafc' });
  }
};
