import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

export function UserOptions() {
  const { user, logoutMutation } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => navigate("/", { replace: true }),
    });
  };

  return (
    <>
      <DropdownMenuLabel>Акаунт:</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {!user && (
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            to="/login"
            className="flex w-full items-center justify-between"
          >
            Вход
            <LogIn className="mr-2 h-4 w-4" />
          </Link>
        </DropdownMenuItem>
      )}
      {user && (
        <DropdownMenuItem onClick={handleLogOut} className="cursor-pointer">
          <span className="flex w-full items-center justify-between">
            Изход
            <LogOut className="mr-2 h-4 w-4" />
          </span>
        </DropdownMenuItem>
      )}
    </>
  );
}
