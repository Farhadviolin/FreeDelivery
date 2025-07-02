import type { AppProps } from 'next/app';
import { AuthProvider } from '../src/auth-context';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
