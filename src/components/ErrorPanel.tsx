import type { ApiError } from "../api/client";
import "./ErrorPanel.css";

type ErrorPanelProps = {
  error: ApiError | null;
};

// Shows nothing when there is no error.
export function ErrorPanel({ error }: ErrorPanelProps) {
  if (!error) {
    return null;
  }

  return (
    <div className="error-panel" role="alert">
      <p className="error-panel-title">{error.message}</p>

      {error.fields && error.fields.length > 0 && (
        <ul className="error-panel-fields">
          {error.fields.map((field, index) => (
            <li key={`${field.field}-${index}`}>
              <strong>{field.field || "form"}</strong>: {field.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}