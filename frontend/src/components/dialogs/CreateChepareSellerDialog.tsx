import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import CheparetaForm from "@/components/forms/CheparetaForm";
import { useCheparetaMutations } from "@/hooks/use-chepareta-mutations";

type CreateChepareSellerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateChepareSellerDialog({
  open,
  onOpenChange,
}: CreateChepareSellerDialogProps) {
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
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* https://www.radix-ui.com/primitives/docs/components/dialog#description */}
        <DialogContent
          aria-describedby={undefined}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-center">
              Добави нов майстор
            </DialogTitle>
          </DialogHeader>

          <CheparetaForm
            isPending={createSeller.isPending}
            onSubmit={onSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
