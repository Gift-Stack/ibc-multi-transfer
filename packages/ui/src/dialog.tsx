import { ReactNode } from "react";
import {
  Button,
  Dialog as DialogPrimitive,
  DialogTrigger,
  Heading,
  Modal as ModalPrimitive,
  ModalOverlay,
} from "react-aria-components";

export function Dialog({ children }: { children: ReactNode }) {
  return (
    <DialogTrigger>
      {children}

      <ModalOverlay
        className={({ isEntering, isExiting }) => `
          fixed inset-0 z-10 overflow-y-auto bg-black/50 flex min-h-full items-center justify-center p-4 text-center backdrop-blur
          ${isEntering ? "animate-in fade-in duration-300 ease-out" : ""}
          ${isExiting ? "animate-out fade-out duration-200 ease-in" : ""}
        `}
      >
        <ModalPrimitive
          className={({ isEntering, isExiting }) => `
            w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl
            ${isEntering ? "animate-in zoom-in-95 ease-out duration-300" : ""}
            ${isExiting ? "animate-out zoom-out-95 ease-in duration-200" : ""}
          `}
        >
          <DialogPrimitive role="alertdialog" className="outline-none relative">
            {({ close }) => (
              <>
                <Heading
                  slot="title"
                  className="text-xxl font-semibold leading-6 my-0 text-slate-700"
                >
                  Transaction in progress...
                </Heading>
                <div className="w-6 h-6 text-red-500 absolute right-0 top-0 stroke-2">
                  {/* <AlertIcon size="M" /> */}
                </div>
                <p className="mt-3 text-slate-500">
                  Are you sure you want to delete "Documents"? All contents will
                  be permanently destroyed.
                </p>
                <div className="mt-6 flex justify-end gap-2">
                  <DialogButton
                    className="bg-slate-200 text-slate-800 hover:border-slate-300 pressed:bg-slate-300"
                    onPress={close}
                  >
                    Close
                  </DialogButton>
                </div>
              </>
            )}
          </DialogPrimitive>
        </ModalPrimitive>
      </ModalOverlay>
    </DialogTrigger>
  );
}

function DialogButton({
  className,
  ...props
}: Parameters<typeof Button>[number]) {
  return (
    <Button
      {...props}
      className={`inline-flex justify-center rounded-md border border-solid border-transparent px-5 py-2 font-semibold font-[inherit] text-base transition-colors cursor-default outline-none focus-visible:ring-2 ring-blue-500 ring-offset-2 ${className}`}
    />
  );
}
