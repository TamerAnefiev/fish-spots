import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import CheparetaForm from "@/components/forms/CheparetaForm";
import { AlertOnOperation } from "./AlertOnOperation";
import { useDiscardChanges } from "@/hooks/use-discard-changes";
import { useCheparetaMutations } from "@/hooks/use-chepareta-mutations";

type CreateChepareSellerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateChepareSellerDialog({
  open,
  onOpenChange,
}: CreateChepareSellerDialogProps) {
  const {
    setIsDirty,
    showAlert,
    setShowAlert,
    handleCloseAttempt,
    confirmExit,
  } = useDiscardChanges(onOpenChange);

  const { createSeller } = useCheparetaMutations();

  const onSubmit = (formData: FormData) => {
    createSeller.mutate(formData, {
      onSuccess: () => {
        toast.success("Майсторът е добавен успешно!");
        onOpenChange(false);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseAttempt();
          }
        }}
      >
        {/* https://www.radix-ui.com/primitives/docs/components/dialog#description */}
        <DialogContent
          aria-describedby={undefined}
          onPointerDownOutside={handleCloseAttempt}
          onEscapeKeyDown={handleCloseAttempt}
        >
          <DialogHeader>
            <DialogTitle className="text-center">
              Добави нов майстор
            </DialogTitle>
          </DialogHeader>

          <CheparetaForm
            onDirtyChange={setIsDirty}
            isPending={createSeller.isPending}
            onSubmit={onSubmit}
          />
        </DialogContent>
      </Dialog>

      <AlertOnOperation
        description={
          "Имате незапазени промени. Ако затворите прозореца сега, всички данни ще бъдат изгубени."
        }
        cancelBtnText={"Остани"}
        confirmBtnText={"Затвори"}
        open={showAlert}
        onOpenChange={setShowAlert}
        onConfirmExit={confirmExit}
      />
    </>
  );
}
