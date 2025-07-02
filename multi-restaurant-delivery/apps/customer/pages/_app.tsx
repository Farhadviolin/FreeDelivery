import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../../packages/ui/src/i18n';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
