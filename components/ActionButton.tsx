"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function ActionButton({ children, variant, size }: any) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant={variant} size={size}>
      {pending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
