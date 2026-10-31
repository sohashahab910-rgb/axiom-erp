import { useState, type FormEvent } from "react";
import { useIdentity } from "./DevIdentityProvider";
import "./SignIn.css";

// A UUID looks like: 3f2a9c1e-7b4d-4e8a-9f10-2c5d6e7f8a9b
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function SignInPage() {
  const { signIn } = useIdentity();
  const [tenantId, setTenantId] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const tenant = tenantId.trim();
    const user = userId.trim();

    if (!UUID_PATTERN.test(tenant) || !UUID_PATTERN.test(user)) {
      setError("Both IDs must be valid UUIDs, for example 00000000-0000-0000-0000-000000000001.");
      return;
    }

    setError(null);
    signIn({ tenantId: tenant, userId: user });
  }

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h1>Axiom ERP</h1>
        <p className="signin-subtitle">Development sign-in</p>

        {error && (
          <p className="signin-error" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label className="signin-field">
            Tenant ID
            <input
              autoFocus
              autoComplete="off"
              spellCheck={false}
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
              aria-invalid={error !== null}
            />
            <span className="signin-hint">The tenant's unique identifier</span>
          </label>

          <label className="signin-field">
            User ID
            <input
              autoComplete="off"
              spellCheck={false}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              aria-invalid={error !== null}
            />
            <span className="signin-hint">Must belong to the tenant above</span>
          </label>

          <button type="submit" className="signin-button">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}