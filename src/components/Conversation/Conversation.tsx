import { generateClient } from "aws-amplify/data";
import { createAIHooks, AIConversation } from "@aws-amplify/ui-react-ai";
import type { Schema } from "../../../amplify/data/resource";
import { Button, ScrollView, Text } from "@aws-amplify/ui-react";
import { AuthUser } from "aws-amplify/auth";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const client = generateClient<Schema>({ authMode: "userPool" });
const { useAIConversationStreaming } = createAIHooks(client);

export default function Conversation(props: {
  conversationId?: string;
  user: AuthUser;
  leaveConversation: () => void;
}) {
  console.log("rendering page");
  const [
    {
      data: { messages },
      hasError,
      isLoading,
    },
    sendMessage,
  ] = useAIConversationStreaming("chat", {
    id: props.conversationId,
  });

  messages.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
  console.log({ hasError });

  return (
    <>
      <Button variation="link" onClick={props.leaveConversation}>
        <ArrowBackIcon />
      </Button>
      <ScrollView
        width="100%"
        minHeight="60vh"
        height={"75vh"}
        maxHeight={"75vh"}
        autoScroll="smooth"
        overflow={"scroll"}
      >
        <AIConversation
          // allowAttachments
          variant="bubble"
          isLoading={isLoading}
          messages={messages}
          handleSendMessage={sendMessage}
          messageRenderer={{
            text(message: string) {
              return (
                <ReactMarkdown rehypePlugins={[rehypeHighlight, remarkGfm]}>
                  {message}
                </ReactMarkdown>
              );
            },
          }}
          avatars={{
            user: {
              username:
                props.user?.signInDetails?.loginId?.split("@")[0] || "User",
              avatar: "🥷",
            },
            ai: {
              username: "Claude",
              avatar: "🤖",
            },
          }}
        />
        <Text as="span" style={{ visibility: "hidden" }}>
          {messages.length}
        </Text>
      </ScrollView>
    </>
  );
}
