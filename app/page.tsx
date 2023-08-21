// import WebViewerWrapper from './webviewer-wrapper';
import dynamic from 'next/dynamic';
const WebViewerWrapper = dynamic(() => import('./webviewer-wrapper'), {ssr: false});

export default function Home() {
  return (
    <main>
      <WebViewerWrapper />
    </main>
  )
}
