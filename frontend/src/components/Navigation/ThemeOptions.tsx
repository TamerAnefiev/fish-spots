import { Sun, Moon } from "lucide-react";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";

export function ThemeOptions() {
  const { theme, setTheme, getBulgarianThemeName } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <div className="flex items-center gap-1">
          {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
          <span>Облик: {getBulgarianThemeName()}</span>
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-45">
          <DropdownMenuCheckboxItem
            checked={theme === "light"}
            disabled={theme === "light"}
            onCheckedChange={() => setTheme("light")}
            className="flex cursor-pointer items-center justify-between"
          >
            <span>Светла тема</span>
            <Sun size={20} />
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={theme === "dark"}
            disabled={theme === "dark"}
            onCheckedChange={() => setTheme("dark")}
            className="flex cursor-pointer items-center justify-between"
          >
            <span>Тъмна тема</span>
            <Moon size={20} />
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={theme === "system"}
            disabled={theme === "system"}
            onCheckedChange={() => setTheme("system")}
            className="cursor-pointer"
          >
            Автоматично
          </DropdownMenuCheckboxItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
