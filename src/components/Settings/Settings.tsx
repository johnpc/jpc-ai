import {
  AccountSettings,
  Button,
  Card,
  Divider,
  Heading,
  Link,
  Text,
  useTheme,
} from "@aws-amplify/ui-react";
import SignOutButton from "./SignOutButton";
import { AuthUser } from "aws-amplify/auth";

export default function Settings(props: {
  user: AuthUser;
  exitSettings: () => void;
}) {
  const { tokens } = useTheme();

  const handleSuccess = () => {
    alert("success!");
  };

  return (
    <Card>
      <Heading>{props.user.signInDetails?.loginId}</Heading>
      <AccountSettings.ChangePassword onSuccess={handleSuccess} />
      <Divider
        marginTop={tokens.space.medium}
        marginBottom={tokens.space.medium}
      />
      <SignOutButton />
      <Divider
        marginTop={tokens.space.medium}
        marginBottom={tokens.space.medium}
      />
      <AccountSettings.DeleteUser onSuccess={handleSuccess} />
      <Divider
        marginTop={tokens.space.medium}
        marginBottom={tokens.space.medium}
      />
      <Button isFullWidth variation="primary" onClick={props.exitSettings}>
        Exit Settings
      </Button>
      <Divider
        marginBottom={tokens.space.medium}
        paddingBottom={tokens.space.medium}
      />
      <Text fontSize={tokens.fontSizes.small}>
        For support, email{" "}
        <Link href="mailto:john@johncorser.com">john@johncorser.com</Link>
      </Text>
    </Card>
  );
}
