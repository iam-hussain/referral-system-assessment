import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React from "react";

import { cn } from "@/lib/utils";

const boxStyles = cva("w-full", {
  variants: {
    preset: {
      "row-start-auto": "flex flex-row justify-center items-start h-auto",
      "row-center": "flex flex-row justify-center items-center",
      "row-start": "flex flex-row justify-start items-center",
      "row-between": "flex flex-row justify-between items-center",
      "stack-center": "flex flex-col justify-center items-center",
      "stack-start": "flex flex-col justify-start items-start",
      "stack-between": "flex flex-col justify-between items-start",
      "grid-split": "grid grid-cols-2",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
    },
    variant: {
      none: "h-auto w-auto",
      page: "max-w-6xl w-full h-full p-4 md:p-6 mx-auto",
      screen: "w-full h-full min-h-screen",
    },
  },
  defaultVariants: {
    preset: "row-start-auto",
    gap: 4,
    variant: "none",
  },
});

interface BoxProps extends VariantProps<typeof boxStyles> {
  className?: string;
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({
  children,
  className,
  preset,
  gap,
  variant,
  ...props
}) => {
  return (
    <div
      data-name={preset || "default"}
      className={cn(clsx(boxStyles({ preset, variant, gap }), className))}
      {...props}
    >
      {children}
    </div>
  );
};

export default Box;
