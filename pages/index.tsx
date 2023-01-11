import Head from "next/head";
import Screenshot from "../Components/Screenshot";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>网站截图</title>
        <link rel="icon" href="/favicon.svg" />
        
      </Head>

      <nav className="nav">
        <img src="/Logo.svg" alt="Logo" className="logo" />
      </nav>
      <div className="content">
        <h1 className="title">给你的网站生成截图</h1>
        <Screenshot />
        <img src="https://screenshot.api.bestrui.top/?url=https://bestrui.top&viewport=1067x600&await=1200&cache=86400" alt="mockup" className="mockup" width="330"  />
        <footer>
          <p>
            Made with
            
            by bestrui
          </p>
        </footer>
      </div>
    </div>
  );
}
