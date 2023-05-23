import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Head>
          <title>Генератор отчетов</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
