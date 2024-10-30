import { render, screen } from "@testing-library/react";
import { unixNanoToDate } from "@/utils/unix-nano-to-date";

import { mockData } from "./logs.mock";

import Page from "../page";

function mockFetch<T>(data: T) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    })
  );
}

window.fetch = mockFetch(mockData);

describe("<LogsPage />", () => {
  it("renders a heading", async () => {
    render(await Page());

    const logRecords = mockData.resourceLogs
      .flat(1)
      .map((logs) => logs.scopeLogs)
      .flat(1)
      .map((logs) => logs.logRecords)
      .flat(1);

    for (const log of logRecords) {
      const LogSeverities = screen.getAllByText(log.severityText);
      expect(LogSeverities.length).toBeGreaterThan(0);

      const LogBody = screen.getByText(JSON.stringify(log.body));
      expect(LogBody).toBeInTheDocument();

      const LogTimes = screen.getAllByText(
        unixNanoToDate(Number(log.timeUnixNano)).toDateString()
      );
      expect(LogTimes.length).toBeGreaterThan(0);
    }

    // Expect that the number of assertions is equal to the number of log records times 3
    expect.assertions(logRecords.length * 3);
  });
});
