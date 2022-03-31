import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import AuthWrapper from "../Components/Layout/AuthWrapper";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    const handleRouteChange = () => {
      isFirstMount && setIsFirstMount(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Decor</title>
      </Head>
      <Provider store={store}>
        <AuthWrapper>
          <AnimatePresence exitBeforeEnter>
            <Toaster />
            <Component
              {...pageProps}
              isFirstMount={isFirstMount}
              key={router.route}
            />
          </AnimatePresence>
        </AuthWrapper>
      </Provider>
    </>
  );
}

export default MyApp;
