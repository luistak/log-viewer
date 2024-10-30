import { LogRecord } from "@/utils/logs";
import { IResourceLogs } from "@opentelemetry/otlp-transformer";
import { Button, Dialog, Flex, Text, Tabs, Box } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export const LogDetails = ({
  children,
  logRecord,
  resourceLog,
}: PropsWithChildren<{ logRecord: LogRecord; resourceLog: IResourceLogs }>) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content maxWidth="600px" align="center">
        <Dialog.Title>Log Details</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Check the log details below
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <Tabs.Root defaultValue="overview">
            <Tabs.List>
              <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
              <Tabs.Trigger value="attributes">Attributes</Tabs.Trigger>
              <Tabs.Trigger value="resource">Resource</Tabs.Trigger>
              <Tabs.Trigger value="raw">Raw Source</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
              <Tabs.Content value="overview">
                <Text size="2">
                  <pre>{JSON.stringify(logRecord, null, 2)}</pre>
                </Text>
              </Tabs.Content>

              <Tabs.Content value="attributes">
                <Text size="2">
                  <pre>{JSON.stringify(logRecord?.attributes, null, 2)}</pre>
                </Text>
              </Tabs.Content>

              <Tabs.Content value="resource">
                <Text size="2">
                  <pre>{JSON.stringify(resourceLog, null, 2)}</pre>
                </Text>
              </Tabs.Content>
              <Tabs.Content value="raw">
                <Text size="2">
                  <pre>{JSON.stringify(logRecord, null, 2)}</pre>
                </Text>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Flex>

        <Flex mt="4" justify="end">
          <Dialog.Close>
            <Button>Close</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
