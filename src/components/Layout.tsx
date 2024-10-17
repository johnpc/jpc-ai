import { useState } from "react";
import { AuthUser } from "aws-amplify/auth";
import Conversations from "./ConversationList/Conversations";
import Conversation from "./Conversation/Conversation";
import { Button, Divider, Text, useTheme } from "@aws-amplify/ui-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Settings from "./Settings/Settings";

export default function Layout(props: { user: AuthUser }) {
  const { tokens } = useTheme();
  const [goToSettings, setGoToSettings] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string>();
  const [shouldStartNewConversation, setShouldStartNewConversation] =
    useState<boolean>(false);

  let contents = (
    <>
      <Button isFullWidth onClick={() => setShouldStartNewConversation(true)}>
        Start new conversation
      </Button>
      <Divider
        marginTop={tokens.space.medium}
        marginBottom={tokens.space.medium}
      />
      <Text>Or continue a recent chat:</Text>
      <Conversations
        onSelectConversation={(conversationId: string) =>
          setConversationId(conversationId)
        }
      />
    </>
  );
  if (goToSettings) {
    contents = (
      <Settings exitSettings={() => setGoToSettings(false)} user={props.user} />
    );
  }
  if (conversationId || shouldStartNewConversation) {
    contents = (
      <Conversation
        user={props.user}
        conversationId={conversationId}
        leaveConversation={() => {
          setShouldStartNewConversation(false);
          setConversationId(undefined);
        }}
      />
    );
  }
  return (
    <>
      <Header goToSettings={() => setGoToSettings(true)} />
      <Divider
        marginTop={tokens.space.medium}
        marginBottom={tokens.space.medium}
      />
      {contents}
      <Divider
        marginTop={tokens.space.medium}
        marginBottom={tokens.space.medium}
      />
      <Footer />
    </>
  );
}
