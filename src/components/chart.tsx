"use client";

import { Histogram } from "@ant-design/plots";
import { LogRecord } from "@/utils/logs";
import { unixNanoToDate } from "@/utils/unix-nano-to-date";
import { Flex, Text } from "@radix-ui/themes";

type Props = {
  logRecords: LogRecord[];
};

export const Chart = ({ logRecords }: Props) => {
  const config = {
    data: logRecords,
    style: {
      inset: 0.5,
    },
    binField: "timeUnixNano",
    colorField: "severityText",
    channel: "count",
    binWidth: 5,
    axis: {
      x: {
        labelFormatter: (data: number) =>
          `${unixNanoToDate(data).toLocaleDateString()}`,
      },
    },
    tooltip: {
      items: [
        { channel: "x", field: "severityText", name: "Severity" },
        { channel: "y", name: "Count" },
      ],
    },
  };

  return (
    <Flex direction="column" data-testid="logs-histogram">
      <Text>Showing {logRecords.length} Log Records</Text>
      <Histogram {...config} />
    </Flex>
  );
};
