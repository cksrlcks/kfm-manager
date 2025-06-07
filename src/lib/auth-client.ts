import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [
    adminClient(),
    inferAdditionalFields({
      user: {
        confirmed: {
          type: "boolean",
        },
        contact: {
          type: "string",
          required: false,
        },
        position: {
          type: "string",
          required: false,
        },
        display: {
          type: "boolean",
          default: false,
        },
      },
    }),
  ],
});
