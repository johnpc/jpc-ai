import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";
import { Card, Text, useTheme } from "@aws-amplify/ui-react";
const client = generateClient<Schema>({ authMode: "userPool" });

export type ConversationArray = NonNullable<
  Awaited<ReturnType<(typeof client.conversations.chat)["list"]>>["data"]
>;

export default function Conversations(props: {
  onSelectConversation: (conversationId: string) => void;
}) {
  const { tokens } = useTheme();
  const [conversations, setConversations] = useState<ConversationArray>([]);
  useEffect(() => {
    const setup = async () => {
      const conversations = await client.conversations.chat.list({
        limit: 10000,
      });

      setConversations(conversations.data);
    };
    setup();
  }, []);

  conversations.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <>
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          onSelectConversation={props.onSelectConversation}
        />
      ))}
      {!conversations.length ? (
        <Card margin={tokens.space.small} variation="outlined">
          <Text>No chats yet!</Text>
        </Card>
      ) : null}
    </>
  );
}
