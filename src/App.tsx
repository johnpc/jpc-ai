import {
  Authenticator,
  Heading,
  Image,
  Link,
  useTheme,
  View,
} from "@aws-amplify/ui-react";
import { Capacitor } from "@capacitor/core";
import Layout from "./components/Layout";

export default function Page() {
  return (
    <Authenticator
      components={{
        Header() {
          const { tokens } = useTheme();
          return (
            <View
              textAlign="center"
              backgroundColor={"#D27F70"}
              padding={"15px"}
            >
              <Image
                alt="logo"
                borderRadius={tokens.radii.xl}
                width={"100px"}
                src="/maskable.png"
              />
              <Heading
                fontSize={tokens.fontSizes.xl}
                color={tokens.colors.primary[90]}
              >
                jpc.ai
              </Heading>
            </View>
          );
        },
        Footer: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            {Capacitor.getPlatform() === "ios" ? null : (
              <Link
                href="https://apps.apple.com/us/app/jpc-ai/id6737018549"
                style={{
                  color: "white",
                }}
              >
                Download the app for iOS devices
              </Link>
            )}
          </div>
        ),
      }}
    >
      {({ user }) => <Layout user={user!} />}
    </Authenticator>
  );
}
