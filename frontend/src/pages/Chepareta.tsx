import { useState } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { CreateChepareSellerDialog } from "@/components/dialogs/CreateChepareSellerDialog";
import CheparetaCards from "@/components/Chepareta/CheparetaCards";
import { useDocumentTitleChange } from "@/hooks/use-document-title-change";
import { DOMAIN } from "@/util/constants";

export default function Chepareta() {
  const { user } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  useDocumentTitleChange(`Чепарета | ${DOMAIN}`);

  return (
    <>
      <meta
        name="description"
        content="Намерете вашият майстор на чепарета за сафрид, карагьоз, паламуд и чернокоп!"
      />

      <main className="py-6">
        {user?.isAdmin && (
          <CreateChepareSellerDialog
            open={formOpen}
            onOpenChange={setFormOpen}
          />
        )}

        <div className="mx-auto mb-16 max-w-7xl">
          <section className="relative flex items-center justify-center">
            <h2 className="text-center text-3xl font-medium">Майстори</h2>
            {user?.isAdmin && (
              <div className="absolute right-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFormOpen(true)}
                >
                  <Plus />
                </Button>
              </div>
            )}
          </section>

          <CheparetaCards />
        </div>
      </main>
    </>
  );
}
