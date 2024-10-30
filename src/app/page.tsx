import { Chart } from "@/components/chart";
import { LogsTable } from "@/components/table/table";
import { getLogs } from "@/services/get-logs";

export const dynamic = "force-dynamic";

import styles from "./styles.module.css";

export default async function Home() {
  const [logRecords, resourceLogs] = await getLogs();

  return (
    <main>
      <div className={styles.container}>
        <h1>Logs Viewer</h1>
        <Chart logRecords={logRecords} />
        <LogsTable logRecords={logRecords} resourceLogs={resourceLogs} />
      </div>
    </main>
  );
}
