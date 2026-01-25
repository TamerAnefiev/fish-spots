import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type AlertOnOperationProps = {
  title?: string;
  description: string;
  cancelBtnText: string;
  confirmBtnText: string;
  onConfirmExit: () => void;
  children?: React.ReactNode;
};

export function AlertOnOperation({
  title = "Сигурни ли сте?",
  description,
  cancelBtnText,
  confirmBtnText,
  onConfirmExit,
  children,
}: AlertOnOperationProps) {
  return (
    <AlertDialog>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelBtnText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmExit}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {confirmBtnText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
