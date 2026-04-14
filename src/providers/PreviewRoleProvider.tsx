"use client";

import { createContext, useContext, useState } from "react";

export type PreviewRole = "donor" | "charity" | "admin";

interface PreviewRoleContextValue {
  role: PreviewRole;
  setRole: (r: PreviewRole) => void;
}

const PreviewRoleContext = createContext<PreviewRoleContextValue>({
  role: "donor",
  setRole: () => {},
});

export function PreviewRoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<PreviewRole>("donor");
  return (
    <PreviewRoleContext.Provider value={{ role, setRole }}>
      {children}
    </PreviewRoleContext.Provider>
  );
}

export function usePreviewRole() {
  return useContext(PreviewRoleContext);
}
