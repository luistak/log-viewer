"use client";

import { Flex, Table } from "@radix-ui/themes";
import { IResourceLogs } from "@opentelemetry/otlp-transformer";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { LogRecord } from "@/utils/logs";
import { LogDetails } from "./log-details";

type Props = {
  logRecords: LogRecord[];
  resourceLogs: IResourceLogs[];
};

export const LogsTable = ({ logRecords, resourceLogs }: Props) => {
  type LogRecord = (typeof logRecords)[number];

  const columnHelper = createColumnHelper<LogRecord>();

  const columns = [
    columnHelper.accessor("severityText", {
      header: "Severity",
    }),
    columnHelper.accessor("body", {
      header: "Body",
      cell: (cell) => <pre>{JSON.stringify(cell.getValue())}</pre>,
    }),
    columnHelper.accessor("timeDate", {
      header: "Time",
      cell: (cell) => {
        return <pre>{cell.getValue().toDateString()}</pre>;
      },
    }),
  ];

  const table = useReactTable({
    data: logRecords,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Flex direction="column" gap="2">
      <Table.Root>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeaderCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>

        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <LogDetails
              key={row.id}
              logRecord={row.original}
              resourceLog={resourceLogs[row.original.resourceLogIndex]}
            >
              <Table.Row>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            </LogDetails>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};
