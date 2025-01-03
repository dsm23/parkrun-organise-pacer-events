import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";
import { render } from "npm:@react-email/render@1.0.3";
import React from "npm:react@19.0.0";
import { ConfirmEmail } from "./templates/confirm-email.tsx";
import { MagicLinkEmail } from "./templates/magic-link.tsx";

const client = new SMTPClient({
  connection: {
    hostname: Deno.env.get("SMTP_HOST") as string,
    port: parseInt(Deno.env.get("SMTP_PORT") as string, 10),
    tls: true,
    auth: {
      username: Deno.env.get("SMTP_USER") as string,
      // password: Deno.env.get("SMTP_PASS") as string,
      password: Deno.env.get("RESEND_API_KEY") as string,
    },
  },
});

const hookSecret = Deno.env.get("SEND_EMAIL_HOOK_SECRET") as string;

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("not allowed", { status: 400 });
  }

  const payload = await req.text();
  const headers = Object.fromEntries(req.headers);
  const wh = new Webhook(hookSecret);

  try {
    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = wh.verify(payload, headers) as {
      user: {
        email: string;
      };
      email_data: {
        token: string;
        token_hash: string;
        redirect_to: string;
        email_action_type: string;
        site_url: string;
        token_new: string;
        token_hash_new: string;
      };
    };

    const from = `${Deno.env.get("SMTP_SENDER_NAME") as string} <${Deno.env.get("SMTP_ADMIN_EMAIL") as string}>`;

    if (email_action_type === "signup") {
      const html = await render(
        React.createElement(ConfirmEmail, {
          supabase_url: Deno.env.get("SUPABASE_URL") ?? "",
          token_hash,
          redirect_to,
          email_action_type,
        }),
      );

      await client.send({
        from,
        to: user.email,
        subject: "Confirm Your Email",
        html,
        content: "auto",
      });
    } else {
      const html = await render(
        React.createElement(MagicLinkEmail, {
          supabase_url: Deno.env.get("SUPABASE_URL") ?? "",
          token,
          token_hash,
          redirect_to,
          email_action_type,
        }),
      );

      await client.send({
        from,
        to: user.email,
        subject: "Login with Magic link",
        html,
        content: "auto",
      });
    }
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          error: {
            message: error.message,
          },
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } finally {
    await client.close();
  }

  const responseHeaders = new Headers();
  responseHeaders.set("Content-Type", "application/json");
  return new Response(JSON.stringify({}), {
    status: 200,
    headers: responseHeaders,
  });
});
