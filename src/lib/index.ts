import { config } from "../config";
import { client } from "../db/primary";

type RedirectHeaders = {
  set: {
    headers: Record<string, string> & {
      "Set-Cookie"?: string | string[];
    };
    status?: number | string;
    redirect?: string;
  };
  headers: Record<string, string | null>;
};

export function redirect({ set, headers }: RedirectHeaders, href: string) {
  if (headers["hx-request"] === "true") {
    set.headers["HX-Location"] = href;
  } else {
    set.redirect = href;
  }
}

export async function syncIfLocal() {
  if (config.env.DATABASE_CONNECTION_TYPE === "local-replica") {
    await client.sync();
  }
}
