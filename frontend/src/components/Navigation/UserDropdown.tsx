import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeOptions } from "./ThemeOptions";
import { UserOptions } from "./UserOptions";

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          variant="ghost"
          className="flex h-8 w-8 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <UserOptions />
        <DropdownMenuSeparator />
        <ThemeOptions />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
