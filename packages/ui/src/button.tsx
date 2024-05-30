import { Button as ButtonPrimitive } from "react-aria-components";

export const Button = ({
  children,
  className,

  ...props
}: Parameters<typeof ButtonPrimitive>[number]) => {
  return (
    <ButtonPrimitive
      className={`w-full p-3 rounded-lg border border-callout-border disabled:opacity-30 ${className}`}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};
