import "../styles/globals.css"
import "../styles/responsive.css";
import ProviderContext from "../pages/context"
import { Provider } from "react-redux";
import Head from "next/head";
import Script from "next/script";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import LoaderState from "../components/Loader";
import store from "src/redux/store";

function App({ Component, pageProps }) {
  
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <>
      <ProviderContext>
        {isLoading ? <LoaderState /> : ""}
        <ToastContainer />
        <Provider store={store}>
          <Head>
            <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
              crossOrigin="anonymous"
            />
          </Head>
          <Script
            id="bootstrap-cdn"
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          />
          <Script src="https://code.jquery.com/jquery-3.5.1.min.js" />
          <Script src="https://meet.jit.si/libs/lib-jitsi-meet.min.js" />
          <Script src="https://meet.jit.si/external_api.js" />
          <Layout>
            <Component pageProps={pageProps} />
          </Layout>
        </Provider>
      </ProviderContext>
    </>
  );
}
export default App;