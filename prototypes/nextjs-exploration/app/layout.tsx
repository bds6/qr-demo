import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Equipment Help | Penn State Media Commons',
  description: 'Scan-to-start equipment guidance from the CLIve QR Assistant.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
