import { createContext, useContext, useState, type ReactNode } from "react";

export type Identity = {
  tenantId: string;
  userId: string;
};

type IdentityContextValue = {
  identity: Identity | null;
  signIn: (identity: Identity) => void;
  signOut: () => void;
};

// A "context" is a shared box that any component below it can read from.
const IdentityContext = createContext<IdentityContextValue | undefined>(
  undefined,
);

// Wraps the app and holds the current tenant and user.
export function DevIdentityProvider({ children }: { children: ReactNode }) {
  const [identity, setIdentity] = useState<Identity | null>(null);

  const value: IdentityContextValue = {
    identity,
    signIn: (next) => setIdentity(next),
    signOut: () => setIdentity(null),
  };

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  );
}

// Any component can call this to read or change who is signed in.
export function useIdentity(): IdentityContextValue {
  const value = useContext(IdentityContext);
  if (!value) {
    throw new Error("useIdentity must be used inside DevIdentityProvider");
  }
  return value;
}