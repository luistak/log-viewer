import {
  IExportLogsServiceRequest,
  ILogRecord,
  IResourceLogs,
} from "@opentelemetry/otlp-transformer";
import { unixNanoToDate } from "./unix-nano-to-date";

type CustomLogRecordProps = {
  resourceLogIndex: number;
  scopeLogsIndex: number;
  timeDate: Date;
  observedTimeDate: Date;
};

export type LogRecord = ILogRecord & CustomLogRecordProps;

export const formatLogRecords = ({
  resourceLogs,
}: IExportLogsServiceRequest): [LogRecord[], IResourceLogs[]] => {
  const filteredResourceLogs = resourceLogs?.filter(Boolean) || [];

  const formattedLogRecords = [];

  for (
    let resourceLogIndex = 0;
    resourceLogIndex < filteredResourceLogs.length;
    resourceLogIndex++
  ) {
    const resourceLog = filteredResourceLogs[resourceLogIndex];

    for (
      let scopeLogsIndex = 0;
      scopeLogsIndex < resourceLog.scopeLogs.length;
      scopeLogsIndex++
    ) {
      const scopeLogs = resourceLog.scopeLogs[scopeLogsIndex];
      const logRecords = scopeLogs.logRecords || [];

      for (const logRecord of logRecords) {
        const formattedRecord = {
          ...logRecord,
          resourceLogIndex,
          scopeLogsIndex,
          timeDate: unixNanoToDate(Number(logRecord.timeUnixNano)),
          observedTimeDate: unixNanoToDate(
            Number(logRecord.observedTimeUnixNano)
          ),
        };

        formattedLogRecords.push(formattedRecord);
      }
    }
  }

  return [formattedLogRecords, filteredResourceLogs];
};
