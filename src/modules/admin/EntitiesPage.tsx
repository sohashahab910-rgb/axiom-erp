import { DataTable, type Column } from "../../components/DataTable";
import { StatusBadge, type BadgeTone } from "../../components/StatusBadge";
import { MoneyCell } from "../../components/MoneyCell";
import "./EntitiesPage.css";

type EntityStatus = "active" | "inactive";

// Money is kept as a string, the same way the backend will send it.
type Entity = {
  id: string;
  code: string;
  name: string;
  country: string;
  baseCurrency: string;
  openingCash: string;
  status: EntityStatus;
};

// Sample data, used until the backend is connected.
const SAMPLE_ENTITIES: Entity[] = [
  {
    id: "e1000000-0000-4000-8000-000000000001",
    code: "AXM-PK",
    name: "Axiom Seafoods Pakistan",
    country: "Pakistan",
    baseCurrency: "PKR",
    openingCash: "12500000.00",
    status: "active",
  },
  {
    id: "e1000000-0000-4000-8000-000000000002",
    code: "AXM-AE",
    name: "Axiom Trading FZE",
    country: "UAE",
    baseCurrency: "USD",
    openingCash: "84250.75",
    status: "active",
  },
  {
    id: "e1000000-0000-4000-8000-000000000003",
    code: "AXM-OLD",
    name: "Axiom Legacy Plant",
    country: "Pakistan",
    baseCurrency: "PKR",
    openingCash: "0.00",
    status: "inactive",
  },
];

const STATUS_TONE: Record<EntityStatus, BadgeTone> = {
  active: "success",
  inactive: "neutral",
};

const columns: Column<Entity>[] = [
  { key: "code", header: "Code", render: (entity) => entity.code },
  { key: "name", header: "Name", render: (entity) => entity.name },
  { key: "country", header: "Country", render: (entity) => entity.country },
  {
    key: "currency",
    header: "Base currency",
    render: (entity) => entity.baseCurrency,
  },
  {
    key: "cash",
    header: "Opening cash",
    render: (entity) => (
      <MoneyCell amount={entity.openingCash} currency={entity.baseCurrency} />
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (entity) => (
      <StatusBadge label={entity.status} tone={STATUS_TONE[entity.status]} />
    ),
  },
];

export function EntitiesPage() {
  return (
    <section className="entities-page">
      <h1>Entities</h1>
      <p className="entities-subtitle">
        Companies inside this tenant. Sample data until the backend is connected.
      </p>

      <DataTable
        columns={columns}
        rows={SAMPLE_ENTITIES}
        getRowKey={(entity) => entity.id}
        emptyMessage="No entities yet."
      />
    </section>
  );
}