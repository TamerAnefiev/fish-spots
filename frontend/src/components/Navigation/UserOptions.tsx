import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertOnOperation } from "../dialogs/AlertOnOperation";

export function UserOptions() {
  const { user, logoutMutation, loginMutation } = useAuth();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const loginPromise = loginMutation.mutateAsync({
        code: codeResponse.code,
      });
      toast.promise(loginPromise, {
        loading: "Влизане в профила...",
        success: "Успешно влязохте в профила си.",
        error: "Грешка при влизане. Моля, опитайте отново.",
      });
    },
    flow: "auth-code",
  });

  const handleLogOut = () => {
    const logoutPromise = logoutMutation.mutateAsync(undefined, {
      onSuccess: () => navigate("/", { replace: true }),
    });
    toast.promise(logoutPromise, {
      loading: "Излизане от профила...",
      success: "Успешно излязохте от профила си.",
    });
  };

  return (
    <>
      <DropdownMenuGroup>
        {user ? (
          <DropdownMenuLabel className="text-muted-foreground flex flex-row items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={user.picture} alt="User profile" />
              <AvatarFallback delayMs={50} className="bg-muted text-xs">
                {user.firstName?.[0].toUpperCase()}
                {user.lastName?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="truncate leading-none">
              {user.firstName}{" "}
              {user.lastName ? `${user.lastName[0].toUpperCase()}.` : null}
            </span>
          </DropdownMenuLabel>
        ) : (
          <DropdownMenuLabel className="text-muted-foreground">
            Акаунт
          </DropdownMenuLabel>
        )}

        <DropdownMenuSeparator />
        {!user && (
          <DropdownMenuItem asChild onClick={login}>
            <Button
              className="flex w-full items-center justify-between focus-visible:ring-0"
              variant="ghost"
            >
              Вход с Google
              <img
                src="/assets/svg/google.svg"
                alt="Google icon"
                width={18}
                height={18}
              />
            </Button>
          </DropdownMenuItem>
        )}
        {user && (
          <AlertOnOperation
            title="Сигурни ли сте, че искате да излезете?"
            description="Ще трябва да се впишете отново, за да достъпите личните си данни."
            cancelBtnText="Отказ"
            confirmBtnText="Изход"
            onConfirmExit={handleLogOut}
          >
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer"
            >
              <span className="flex w-full items-center justify-between">
                Изход
                <LogOut className="mr-2 h-4 w-4" />
              </span>
            </DropdownMenuItem>
          </AlertOnOperation>
        )}
      </DropdownMenuGroup>
    </>
  );
}
