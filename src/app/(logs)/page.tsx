import { LogsTable } from "@/components/table";
import { getLogs } from "@/services/get-logs";

export default async function Home() {
  const [logRecords, resourceLogs] = await getLogs();

  return (
    <main>
      <LogsTable logRecords={logRecords} resourceLogs={resourceLogs} />
    </main>
  );
}
