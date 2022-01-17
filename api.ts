import { parse } from "https://deno.land/x/xml@2.0.3/mod.ts";

import type {
  ClientOptions,
  CreateOptions,
  DeletePasteOptions,
  GetPastesOptions,
  GetRawPasteOptions,
  Paste,
  User,
} from "./types.ts";

export class PasteClient {
  private devKey: string;
  private rootDomain = "pastebin.com";

  constructor(options: string | ClientOptions) {
    if (typeof options === "string") {
      this.devKey = options;
    } else {
      this.devKey = options.devKey;
      this.rootDomain = options.domain ?? "pastebin.com";
    }
  }

  private async request(
    url: string,
    options: Record<string, unknown>,
  ): Promise<string> {
    let body = "";
    for (const [key, value] of Object.entries(options)) {
      if (!value) continue;
      body += `&${encodeURIComponent(key)}=${encodeURIComponent(`${value}`)}`;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.substring(1),
    });

    const text = await res.text();
    if (!res.ok || text.startsWith("Bad API request")) throw new Error(text);

    return text;
  }

  /**
   * Set custom API root domain. Uses `pastebin.com` by default.
   * @param domain The domain of your reverse proxy server.
   */
  set domain(value: string) {
    this.rootDomain = value;
  }

  /**
   * login to get access to more API routes. See [docs](https://pastebin.com/doc_api#9)
   * @param name The user's name.
   * @param password The user's password.
   * @returns The user token to use for other API routes.
   */
  async login(name: string, password: string): Promise<string> {
    const res = await this.request(
      `https://${this.rootDomain}/api/api_login.php`,
      {
        api_dev_key: this.devKey,
        api_user_name: name,
        api_user_password: password,
      },
    );

    if (res.startsWith("Bad API request")) throw new Error(res);
    return res;
  }

  /**
   * return raw paste by it's key. See [docs](https://pastebin.com/doc_api#14).
   * @param options URL or the key of the paste, if it is public or unlisted. If it's an private paste, pass an object with required options.
   * @returns The raw paste
   */
  async getRaw(options: string | GetRawPasteOptions): Promise<string> {
    // Just key or URL to the paste -- only public and unlisted.
    if (typeof options === "string") {
      let key = options;
      const pastebinRegEx = new RegExp(
        `^((?:https?:)?\/\/)?\.?((?:pastebin\.com|${this.rootDomain}))\/(.+)`,
      );
      if (pastebinRegEx.test(key)) key = key.match(pastebinRegEx)![3];
      const res = await fetch(`https://pastebin.com/raw/${key}`);
      if (!res.ok) throw new Error(res.statusText);
      const code = await res.text();
      return code;
    }

    // Support for private pastes.
    const code = await this.request(
      `https://${this.rootDomain}/api/api_raw.php`,
      {
        api_dev_key: this.devKey,
        api_option: "show_paste",
        api_user_key: options.userKey,
        api_paste_key: options.pasteKey,
      },
    );

    if (code.startsWith("Bad API request")) throw new Error(code);
    return code;
  }

  async getUser(userKey: string): Promise<User> {
    const res = await this.request(
      `https://${this.rootDomain}/api/api_post.php`,
      {
        api_dev_key: this.devKey,
        api_option: "userdetails",
        api_user_key: userKey,
      },
    );

    const parsed = parse(`<u>${res}</u>`);
    const { user } = parsed["u"] as Record<string, User>;
    return user;
  }

  /**
   * Get a limit of 1000 pastes from the logged in user. See [docs](https://pastebin.com/doc_api#10).
   * @param options User key and limit.
   * @returns An array of all the user's pastes
   */
  async getPastes(
    options: GetPastesOptions,
  ): Promise<Paste[]> {
    if (options.limit) {
      if (options.limit < 1 || options.limit > 1000) {
        throw TypeError("Limit cannot be lower than 1 or higher than 1000");
      }
    }

    const res = await this.request(
      `https://${this.rootDomain}/api/api_post.php`,
      {
        api_dev_key: this.devKey,
        api_option: "list",
        api_user_key: options.userKey,
        api_results_limit: options.limit,
      },
    );

    if (res === "No pastes found.") return [];

    const parsed = parse(`<pastes>${res}</pastes>`);
    const { paste } = parsed["pastes"] as Record<string, Paste[]>;

    if (Array.isArray(paste)) return paste;
    return [paste];
  }

  /**
   * Create a new paste. See [official docs](https://pastebin.com/doc_api#2).
   * @param options The options for the paste
   * @returns The URL of the created paste
   */
  async create(options: CreateOptions): Promise<string> {
    if (options.name && options.name.length > 100) {
      throw new TypeError("Name of paste cannot be longer than 100 characters");
    }

    const res = await this.request(
      `https://${this.rootDomain}/api/api_post.php`,
      {
        api_dev_key: this.devKey,
        api_option: "paste",
        api_paste_name: options.name ?? "Untitled",
        api_paste_code: options.code,
        api_paste_format: options.format ?? "text",
        api_paste_private: options.publicity ?? 0,
        api_paste_expire_date: options.expireDate ?? "N",
        api_user_key: options.userKey ?? "",
        api_folder_key: options.folderKey ?? "",
      },
    );

    if (res.startsWith("Bad API request")) throw new Error(res);
    return res;
  }

  /**
   * Delete a paste by it's key. See [docs](https://pastebin.com/doc_api#11).
   * @param options User key and paste key.
   * @returns Whether it was deleted or not.
   */
  async deletePaste(options: DeletePasteOptions): Promise<boolean> {
    const res = await this.request(
      `https://${this.rootDomain}/api/api_post.php`,
      {
        api_dev_key: this.devKey,
        api_option: "delete",
        api_paste_key: options.pasteKey,
        api_user_key: options.userKey,
      },
    );

    // paste was successfully removed
    if (res === "Paste Removed") return true;
    throw new Error(res);
  }
}
