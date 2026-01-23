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
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserDropdown() {
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant="ghost" className="rounded-full">
          <Avatar className="size-8">
            <AvatarImage src={user?.picture} alt="User profile" />
            <AvatarFallback delayMs={50} className="bg-muted">
              <User />
            </AvatarFallback>
          </Avatar>
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
