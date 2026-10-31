import { useState } from "react";
import { DataTable, type Column } from "../../components/DataTable";
import { StatusBadge } from "../../components/StatusBadge";
import { ErrorPanel } from "../../components/ErrorPanel";
import type { ApiError } from "../../api/client";
import "./UsersPage.css";

// The 12 roles from the handoff (section 3.1). Only these values are valid.
const ROLES = [
  "admin",
  "accountant",
  "viewer",
  "landing_clerk",
  "quality_grader",
  "production_operator",
  "plant_manager",
  "food_safety_manager",
  "export_compliance_officer",
  "maintenance_technician",
  "maintenance_manager",
  "iot_device",
] as const;

type Role = (typeof ROLES)[number];

// Matches the handoff's UserRead fields.
type User = {
  id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  roles: Role[];
};

// Sample data, used until the backend is connected.
const SAMPLE_USERS: User[] = [
  {
    id: "00000000-0000-0000-0000-000000000011",
    fullName: "Amina Qureshi",
    email: "amina@axiom.example",
    isActive: true,
    roles: ["admin"],
  },
  {
    id: "00000000-0000-0000-0000-000000000012",
    fullName: "Bilal Ahmed",
    email: "bilal@axiom.example",
    isActive: true,
    roles: ["accountant", "viewer"],
  },
  {
    id: "00000000-0000-0000-0000-000000000013",
    fullName: "Sara Khan",
    email: "sara@axiom.example",
    isActive: false,
    roles: ["landing_clerk"],
  },
];

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(SAMPLE_USERS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftRoles, setDraftRoles] = useState<Role[]>([]);

  // No backend yet, so there are no errors to show.
  const error: ApiError | null = null;

  const editingUser = users.find((user) => user.id === editingId) ?? null;

  function startEditing(user: User) {
    setEditingId(user.id);
    setDraftRoles(user.roles);
  }

  function cancelEditing() {
    setEditingId(null);
    setDraftRoles([]);
  }

  function toggleRole(role: Role) {
    setDraftRoles((current) =>
      current.includes(role)
        ? current.filter((item) => item !== role)
        : [...current, role],
    );
  }

  function saveRoles() {
    if (!editingUser) {
      return;
    }
    // Later this will call PUT /users/{id}/roles with the draft roles.
    setUsers((current) =>
      current.map((user) =>
        user.id === editingUser.id ? { ...user, roles: draftRoles } : user,
      ),
    );
    cancelEditing();
  }

  const columns: Column<User>[] = [
    { key: "name", header: "Name", render: (user) => user.fullName },
    { key: "email", header: "Email", render: (user) => user.email },
    {
      key: "roles",
      header: "Roles",
      render: (user) => (user.roles.length > 0 ? user.roles.join(", ") : "No roles"),
    },
    {
      key: "status",
      header: "Status",
      render: (user) =>
        user.isActive ? (
          <StatusBadge label="active" tone="success" />
        ) : (
          <StatusBadge label="inactive" tone="neutral" />
        ),
    },
    {
      key: "actions",
      header: "",
      render: (user) => (
        <button
          type="button"
          className="users-edit-button"
          onClick={() => startEditing(user)}
        >
          Edit roles
        </button>
      ),
    },
  ];

  return (
    <section className="users-page">
      <h1>Users and roles</h1>
      <p className="users-subtitle">
        Admin only. Sample data until the backend is connected.
      </p>

      <ErrorPanel error={error} />

      <DataTable
        columns={columns}
        rows={users}
        getRowKey={(user) => user.id}
        emptyMessage="No users yet."
      />

      {editingUser && (
        <div className="users-role-editor">
          <h2>Roles for {editingUser.fullName}</h2>

          <div className="users-role-grid">
            {ROLES.map((role) => (
              <label key={role} className="users-role-option">
                <input
                  type="checkbox"
                  checked={draftRoles.includes(role)}
                  onChange={() => toggleRole(role)}
                />
                {role}
              </label>
            ))}
          </div>

          <div className="users-role-actions">
            <button type="button" className="users-cancel" onClick={cancelEditing}>
              Cancel
            </button>
            <button type="button" className="users-save" onClick={saveRoles}>
              Save roles
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
