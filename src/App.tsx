import { Route, Routes } from "react-router-dom";
import { SignInPage } from "./auth/SignInPage";
import { useIdentity } from "./auth/DevIdentityProvider";
import { AppShell } from "./app/AppShell";
import { UsersPage } from "./modules/admin/UsersPage";
import { EntitiesPage } from "./modules/admin/EntitiesPage";
import { TenantsPage } from "./modules/admin/TenantsPage";

// A temporary stand-in for screens that come in later phases.
function PlaceholderPage({ title, note }: { title: string; note: string }) {
  return (
    <>
      <h1>{title}</h1>
      <p>{note}</p>
    </>
  );
}

function App() {
  const { identity } = useIdentity();

  if (!identity) {
    return <SignInPage />;
  }

  return (
    <AppShell>
      <Routes>
        <Route
          path="/"
          element={
            <PlaceholderPage
              title="Home"
              note="Your inbox, running jobs and approvals will appear here in a later phase."
            />
          }
        />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/entities" element={<EntitiesPage />} />
        <Route path="/admin/tenants" element={<TenantsPage />} />
        <Route
          path="*"
          element={<PlaceholderPage title="Page not found" note="This address does not exist." />}
        />
      </Routes>
    </AppShell>
  );
}

export default App;