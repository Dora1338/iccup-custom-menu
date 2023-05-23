import { FC, PropsWithChildren } from "react";
import { Header } from "./Header";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="min-h-screen w-full mx-auto justify-between px-4 bg-gray-50 dark:bg-gray-900 sm:px-6 lg:px-8 lg:flex lg:flex-row">
        {children}
      </div>
    </>
  );
};
