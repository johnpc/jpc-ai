"use client";
import {
  Card,
  Image,
  Flex,
  Text,
  Button,
  useTheme,
} from "@aws-amplify/ui-react";

export const Footer = () => {
  const { tokens } = useTheme();
  return (
    <Card>
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        alignContent="flex-start"
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          alignContent="flex-start"
          gap={tokens.space.xs}
        >
          <Flex
            as="span"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            alignContent="flex-start"
            gap={tokens.space.xs}
          >
            <Button as="a" href="https://github.com/johnpc/jpc-ai">
              <Image alt="github" src="/github.png" />
            </Button>
            <Text as="span">ai.jpc.io is open source.</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
