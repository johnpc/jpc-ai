import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.johncorser.ai",
  appName: "jpc.ai",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  ios: {
    contentInset: "always",
    backgroundColor: "#D27F70",
  },
};

export default config;
