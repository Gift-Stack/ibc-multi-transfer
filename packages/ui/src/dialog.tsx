import { ReactNode } from "react";
import {
  Button,
  Dialog as DialogPrimitive,
  DialogTrigger,
  Modal as ModalPrimitive,
  ModalOverlay,
  Heading,
} from "react-aria-components";
import { Button as UIButton } from "./button";

type Status = "pending" | "success" | "error" | "idle";

export function Dialog({
  children,
  status,
  label,
  description,
}: {
  children: ReactNode;
  status: Status;
  label?: string;
  description?: string;
}) {
  const iconClassNames = {
    pending: "bg-blue-100 text-blue-500 animate-spin",
    success: "bg-green-100 text-green-500",
    error: "bg-red-100 text-red-500",
    idle: "hidden",
  };
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
                  Transaction status
                </Heading>
                <div className="grid gap-4 py-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={"rounded-full p-2 " + iconClassNames[status]}
                    >
                      {status === "pending" && (
                        <LoaderIcon className="h-6 w-6" />
                      )}
                      {status === "success" && (
                        <CheckIcon className="h-6 w-6" />
                      )}
                      {status === "error" && <XIcon className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-black font-medium">{label}</p>
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <UIButton
                    onPress={close}
                    className="text-black py-3 px-5 text-sm max-w-max"
                  >
                    Close
                  </UIButton>
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

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LoaderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
