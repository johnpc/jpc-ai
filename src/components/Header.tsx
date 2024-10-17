"use client";
import {
  Card,
  View,
  Heading,
  Text,
  useTheme,
  Grid,
  Image,
  Flex,
} from "@aws-amplify/ui-react";
import SettingsIcon from "@mui/icons-material/Settings";
export const Header = (props: { goToSettings: () => void }) => {
  const { tokens } = useTheme();
  return (
    <Grid
      templateColumns="3fr 1fr"
      templateRows="4rem"
      gap={tokens.space.small}
    >
      <View>
        <Card>
          <Flex
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            alignContent="flex-start"
            wrap="nowrap"
            gap="1rem"
          >
            <View height="2rem">
              <Image
                objectFit={"initial"}
                src="/maskable.png"
                alt="icon"
                borderRadius={tokens.radii.large}
                height={"50px"}
              ></Image>
            </View>
            <View height="2rem">
              <Heading color={tokens.colors.neutral[60]} level={5}>
                ai.jpc.io
              </Heading>
              <Text
                color={tokens.colors.neutral[40]}
                as="span"
                fontSize={"small"}
              >
                AI Chatbot
              </Text>
            </View>
          </Flex>
        </Card>
      </View>
      <View>
        <Card>
          <Text as="span" onClick={() => props.goToSettings()}>
            <SettingsIcon />
          </Text>
        </Card>
      </View>
    </Grid>
  );
};
