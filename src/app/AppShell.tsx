import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useIdentity } from "../auth/DevIdentityProvider";
import "./AppShell.css";

type AppShellProps = {
  children: ReactNode;
};

type NavLinkItem = { label: string; to: string };
type NavGroup = { title: string; links: NavLinkItem[] };

// Groups follow the handout's navigation table (section 2.4).
// Only Home and Admin exist so far. Other groups are added in later phases.
const NAV_GROUPS: NavGroup[] = [
  {
    title: "Home",
    links: [{ label: "Home / Operations", to: "/" }],
  },
  {
    title: "Admin",
    links: [
      { label: "Users and roles", to: "/admin/users" },
      { label: "Entities", to: "/admin/entities" },
      { label: "Tenants", to: "/admin/tenants" },
    ],
  },
];

export function AppShell({ children }: AppShellProps) {
  const { identity, signOut } = useIdentity();

  return (
    <div className="shell">
      <aside className="shell-sidebar">
        <h2 className="shell-brand">Axiom ERP</h2>

        <nav className="shell-nav" aria-label="Main navigation">
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="shell-section-label">{group.title}</p>
              <ul>
                {group.links.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className="shell-nav-item"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="shell-footer">
          <button type="button" className="shell-signout" onClick={signOut}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="shell-main">
        <p className="shell-tenant">Tenant: {identity?.tenantId}</p>
        {children}
      </main>
    </div>
  );
}