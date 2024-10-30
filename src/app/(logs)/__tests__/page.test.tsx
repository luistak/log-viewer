import { render, screen } from "@testing-library/react";
import { unixNanoToDate } from "@/utils/unix-nano-to-date";
import user from "@testing-library/user-event";

import { mockData } from "./logs.mock";

import Page from "../page";
import { formatLogRecords } from "@/utils/logs";

function mockFetch<T>(data: T) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    })
  );
}

window.fetch = mockFetch(mockData);

const [logRecords] = formatLogRecords(mockData);

describe("<LogsPage />", () => {
  it("should render log records accordingly", async () => {
    render(await Page());
    for (const log of logRecords) {
      const LogSeverities = screen.getAllByText(log.severityText!);
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

  it("should open a log detail accordingly", async () => {
    render(await Page());

    const anyLog = logRecords[0];

    const LogSeverities = screen.getAllByText(anyLog.severityText!);
    expect(LogSeverities.length).toBeGreaterThan(0);

    const [LogTabPanel] = LogSeverities;

    await user.click(LogTabPanel);

    const Dialog = await screen.findByRole("dialog");
    expect(Dialog).toBeInTheDocument();

    const DrawerTitle = await screen.findByLabelText(/log details/i);
    expect(DrawerTitle).toBeInTheDocument();

    const OverviewTab = await screen.findByRole("tab", {
      name: /overview/i,
    });
    expect(OverviewTab).toBeInTheDocument();

    const LogDetails = await screen.getByText(
      new RegExp(String(anyLog.timeUnixNano))
    );
    expect(LogDetails).toBeInTheDocument();

    const AttributesTab = await screen.findByRole("tab", {
      name: /attributes/i,
    });
    expect(AttributesTab).toBeInTheDocument();

    // Should navigate tabs and change it's content accordingly
    await user.click(AttributesTab);
    const LogAttributes = await screen.findByText(
      JSON.stringify(anyLog.attributes, null, 2)
    );
    expect(LogAttributes).toBeInTheDocument();

    const ResourceTab = await screen.findByRole("tab", {
      name: /resource/i,
    });
    expect(ResourceTab).toBeInTheDocument();

    const SourceTab = await screen.findByRole("tab", { name: /raw source/i });
    expect(SourceTab).toBeInTheDocument();
  });
});
