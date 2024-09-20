import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Link, LinkProps } from "@tanstack/react-router";

const linkVariants = cva(
  "inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-8 w-8 rounded-lg text-foreground/80",
        auto: "h-auto px-4 py-2",
        none: "h-auto w-auto p-0 m-0",
      },
      animation: {
        default: "",
        scale: "no-touch:hover:scale-110 active:scale-90",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "default",
    },
  },
);

type LinkVariantProps = VariantProps<typeof linkVariants>;

export { CustomLink, linkVariants };

export interface CustomLinkProps
  extends LinkProps,
    // React.AnchorHTMLAttributes<HTMLAnchorElement>,
    LinkVariantProps {
  asChild?: boolean;
  className?: string;
  children: any;
  onClick?: () => void;
}

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    {
      className,
      variant,
      animation,
      size,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : Link;

    return (
      <Comp
        className={cn(linkVariants({ variant, size, animation, className }))}
        ref={ref}
        {...(props as any)}
      >
        <Slottable>{children}</Slottable>
      </Comp>
    );
  },
);

CustomLink.displayName = "CustomLink";
