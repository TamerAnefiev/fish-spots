import { Sun, Moon, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";

export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"}>
          <SunMoon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Избери облик:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          disabled={theme === "light"}
          onCheckedChange={() => setTheme("light")}
          className="flex justify-between items-center cursor-pointer"
        >
          <span>Светла тема</span>
          <Sun size={20} />
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          disabled={theme === "dark"}
          onCheckedChange={() => setTheme("dark")}
          className="flex justify-between items-center cursor-pointer"
        >
          <span>Тъмна тема</span>
          <Moon size={20} />
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          disabled={theme === "system"}
          onCheckedChange={() => setTheme("system")}
        >
          Автоматично
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
