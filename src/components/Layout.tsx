import { Header } from "@/components/Header";
import { FC, PropsWithChildren } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main
        className={`${inter.className} min-h-screen w-full mx-auto justify-between transition-all duration-500 px-4 bg-gray-50 dark:bg-gray-900 sm:px-6 lg:px-8 lg:flex lg:flex-row`}
      >
        {children}
      </main>
    </>
  );
};
