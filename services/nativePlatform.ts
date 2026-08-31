import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

export const isNativePlatform = () => Capacitor.isNativePlatform();

/** Keeps native status chrome aligned with Bokatas without affecting the web/PWA. */
export const syncNativeTheme = async (theme: 'light' | 'dark') => {
  if (!isNativePlatform()) return;
  await StatusBar.setStyle({ style: theme === 'dark' ? Style.Dark : Style.Light });
  if (Capacitor.getPlatform() === 'android') {
    await StatusBar.setBackgroundColor({ color: theme === 'dark' ? '#0b1220' : '#f8fafc' });
  }
};
