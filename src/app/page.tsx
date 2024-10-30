import { getLogs } from "@/services/get-logs";

export default async function Home() {
  const logs = await getLogs();
  if (!logs.resourceLogs) {
    return <div>Empty State</div>;
  }

  console.log({ logs });

  return <main>Oi</main>;
}
