import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky z-10 top-0 h-[72px] transition-all duration-500 bg-gray-50 dark:bg-gray-900 border-b border-gray-800">
      <div className="mx-auto max-w-8xl xl:px-8">
        <div className="flex items-center justify-end px-4 py-5 sm:px-6 lg:px-8 xl:px-0">
          <button
            className="block py-2 pl-3 pr-4 md:p-0"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            type="button"
          >
            {theme === "dark" ? (
              <HiOutlineMoon size={24} />
            ) : (
              <HiOutlineSun size={24} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
