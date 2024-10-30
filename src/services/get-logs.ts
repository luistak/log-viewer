import { IExportLogsServiceRequest } from "@opentelemetry/otlp-transformer";

export const getLogs = async () => {
  const response = await fetch(
    "https://take-home-assignment-otlp-logs-api.vercel.app/api/logs"
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data as IExportLogsServiceRequest;
};
