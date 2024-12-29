import { Card, Heading, Loader, Text, useTheme } from "@aws-amplify/ui-react";
import type { Schema } from "../../../amplify/data/resource";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function ConversationItem(props: {
  onSelectConversation: (conversationId: string) => void;
  conversation: Schema["chat"]["type"];
}) {
  const { tokens } = useTheme();
  const [title, setTitle] = useState<string>(props.conversation.name ?? '');
  useEffect(() => {
    const setup = async () => {
      const messages = await props.conversation.listMessages();
      if (props.conversation.name) {
        return;
      }
      const firstMessage = messages.data
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        .find((t) => t);
      if (firstMessage?.content[0]?.text) {
        setTitle(firstMessage?.content[0]?.text);
      } else {
        setTitle("No messages yet");
      }
    };
    setup();
  }, []);

  const date = new Date(props.conversation.createdAt);
  const content = title ? (
    <>
      <Heading marginBottom={tokens.space.medium}>
        {formatDistanceToNow(date, {
          addSuffix: true,
        })}
      </Heading>
      <Text>{title}</Text>
    </>
  ) : (
    <Loader />
  );

  return (
    <Card
      margin={tokens.space.small}
      onClick={() => props.onSelectConversation(props.conversation.id)}
      variation="outlined"
    >
      {content}
    </Card>
  );
}
