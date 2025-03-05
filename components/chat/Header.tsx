// components/chat/Header.tsx
import { Menu } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <button
        onClick={onToggleSidebar}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          I&apos;m Groot
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          AI Assistant X Binu B Daniel
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
     
      <ThemeSwitcher />
    </div>
  </div>
);

