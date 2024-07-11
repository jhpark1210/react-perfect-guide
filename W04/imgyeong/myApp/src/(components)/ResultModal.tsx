import { ModalProps } from "../lib/types";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "../components/ui/button";

interface DialogHandle {
   open: () => void;
}

const ResultModal = forwardRef<DialogHandle, ModalProps>(function ResultModal(
   { onReset, title },
   ref
) {
   const dialog = useRef<HTMLDialogElement>(null);

   const open = () => {
      if (dialog.current) dialog.current.showModal();
   };

   useImperativeHandle(ref, () => ({
      open,
   }));

   const modalRoot = document.getElementById("modal");

   if (!modalRoot) return null;

   const modalElement = (
      <dialog ref={dialog} onClose={onReset} className="p-5 rounded-lg">
         <p className="p-4">
            Your time for <strong>{title}</strong> is over!
         </p>
         <form method="dialog">
            <Button>Close</Button>
         </form>
      </dialog>
   );

   return createPortal(modalElement, modalRoot);
});

export default ResultModal;
