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
    <header className="sticky top-0 h-[72px] transition-all duration-500 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-8xl xl:px-8">
        <div className="flex items-center justify-end border-b border-gray-800 px-4 py-5 sm:px-6 lg:px-8 xl:px-0">
          <button
            className="block py-2 pl-3 pr-4 rounded md:p-0"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
