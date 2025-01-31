import { generateClient } from "aws-amplify/data";
import { createAIHooks, AIConversation } from "@aws-amplify/ui-react-ai";
import type { Schema } from "../../../amplify/data/resource";
import { Button, ScrollView } from "@aws-amplify/ui-react";
import { AuthUser } from "aws-amplify/auth";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Camera } from "@capacitor/camera";
import { useEffect, useState } from "react";

const client = generateClient<Schema>({ authMode: "userPool" });
const { useAIConversation } = createAIHooks(client);
const updateConversation: (
  conversation: Partial<Schema["chat"]["type"]> & { id: string }
) => void = (
  conversation
) => {
  client.conversations.chat.update(conversation);
};

export default function Conversation(props: {
  conversationId?: string;
  user: AuthUser;
  leaveConversation: () => void;
}) {
  const [permissionDenied, setPermissionDenied] = useState(false);

  const pollPermissions = () => {
    setTimeout(async () => {
      const permissions = await Camera.checkPermissions();
      const isDenied =
        permissions.camera === "denied" || permissions.photos === "denied";
      if (isDenied) {
        setPermissionDenied(true);
        return;
      }
      const isPrompt =
        permissions.camera === "prompt" ||
        permissions.photos === "prompt" ||
        permissions.photos === "prompt-with-rationale" ||
        permissions.camera === "prompt-with-rationale";
      if (isPrompt) {
        pollPermissions();
        return;
      }
      pollPermissions();
    }, 500);
  };

  useEffect(() => {
    pollPermissions();
  }, []);

  const [
    {
      data: { messages, conversation },
      hasError,
      isLoading,
    },
    sendMessage,
  ] = useAIConversation("chat", {
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
        // autoScroll="smooth"
        overflow={"scroll"}
      >
        <AIConversation
          allowAttachments={!permissionDenied}
          variant="bubble"
          isLoading={isLoading}
          messages={messages}
          handleSendMessage={(message) => {
            sendMessage(message);
            // only run this on the first message...
            if (!conversation?.name) {
              const existingMessage = messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).find(t => t)?.content.map((c) => c.text ?? "").join("")
              client.generations
                .chatNamer({
                  content: existingMessage ?? message.content.map((c) => c.text ?? "").join(""),
                })
                .then((res) => {
                  updateConversation({
                    id: props.conversationId ?? conversation!.id,
                    name: res.data?.name ?? "",
                  });
                });
            }
          }}
          messageRenderer={{
            text: (input: {text: string}) => {
              return (
                <ReactMarkdown rehypePlugins={[rehypeHighlight, remarkGfm]}>
                  {input.text}
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
        {/* This causes automatic scrolling to the bottom */}
        {/* <Text as="span" style={{ visibility: "hidden" }}>
          {messages.length}
        </Text> */}
      </ScrollView>
    </>
  );
}
