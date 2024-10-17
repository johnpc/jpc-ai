import "@aws-amplify/ui-react/styles.css";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import config from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import {
  defaultDarkModeOverride,
  Theme,
  ThemeProvider,
} from "@aws-amplify/ui-react";
Amplify.configure(config);

const theme: Theme = {
  name: "my-theme",
  primaryColor: "neutral",
  overrides: [defaultDarkModeOverride],
  tokens: {
    components: {
      text: {
        color: { value: "{colors.neutral[40]}" },
      },
      heading: {
        color: { value: "{colors.neutral[60]}" },
      },
      button: {
        color: { value: "{colors.neutral[60]}" },
      },
    },
  },
};
// theme.tokens?.colors?
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme} colorMode={"dark"}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
