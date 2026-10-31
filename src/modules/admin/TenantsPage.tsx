import { DataTable, type Column } from "../../components/DataTable";
import { StatusBadge, type BadgeTone } from "../../components/StatusBadge";
import "./TenantsPage.css";

type TenantStatus = "active" | "trial" | "suspended";

type Tenant = {
  id: string;
  name: string;
  slug: string;
  plan: string;
  entityCount: number;
  status: TenantStatus;
};

// Sample data, used until the backend is connected.
const SAMPLE_TENANTS: Tenant[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Axiom Seafoods Group",
    slug: "axiom-seafoods",
    plan: "Enterprise",
    entityCount: 2,
    status: "active",
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    name: "Coastal Fish Co.",
    slug: "coastal-fish",
    plan: "Starter",
    entityCount: 1,
    status: "trial",
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    name: "Harbour Logistics",
    slug: "harbour-logistics",
    plan: "Professional",
    entityCount: 3,
    status: "suspended",
  },
];

const STATUS_TONE: Record<TenantStatus, BadgeTone> = {
  active: "success",
  trial: "warning",
  suspended: "danger",
};

const columns: Column<Tenant>[] = [
  { key: "name", header: "Name", render: (tenant) => tenant.name },
  { key: "slug", header: "Slug", render: (tenant) => tenant.slug },
  { key: "plan", header: "Plan", render: (tenant) => tenant.plan },
  {
    key: "entities",
    header: "Entities",
    render: (tenant) => tenant.entityCount,
  },
  {
    key: "status",
    header: "Status",
    render: (tenant) => (
      <StatusBadge label={tenant.status} tone={STATUS_TONE[tenant.status]} />
    ),
  },
];

export function TenantsPage() {
  return (
    <section className="tenants-page">
      <h1>Tenants</h1>
      <p className="tenants-subtitle">
        Customer organisations on the platform. Sample data until the backend is connected.
      </p>

      <DataTable
        columns={columns}
        rows={SAMPLE_TENANTS}
        getRowKey={(tenant) => tenant.id}
        emptyMessage="No tenants yet."
      />
    </section>
  );
}