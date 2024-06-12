import React from "react";

import { Toast as ToastComponent } from "@/components/ui/use-toast";

type Toast = ({ ...props }: ToastComponent) => {
  id: string,
  dismiss: () => void,
  update: (props: any) => void
}
export default function renderDebugToast(toast: Toast, data: any) {
  toast({
    variant: "default",
    title: "You submitted the following values:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 scroll-auto">
          <code className="text-white scroll-auto">{JSON.stringify({}, null, 2)}</code>
        </pre>
    ),
  });
}