# [Pastebin](https://pastebin.com) API wrapper for Deno [🦕](https://deno.land/)

A tiny [Deno](https://deno.land/) module to interact with
[Pastebin](https://pastebin.com)'s [API](https://pastebin.com/doc_api).

- Deno module: <https://deno.land/x/deno_pastebin>
- Pastebin's official API documentation: <https://pastebin.com/doc_api>

### Credits

This module is a fork and improved [Deno](https://deno.land) version of
[pastebin-api](https://github.com/Dev-CasperTheGhost/pastebin-api/) by
[Dev-CasperTheGhost](https://github.com/Dev-CasperTheGhost). Credits goes to
them for the base.

## Usage

Simply import from the library and use the available methods. You have to create
an account and use the
[unique Developer API Key pastebin provides](https://pastebin.com/doc_api#1) in
order to interact with the API service using this module.

```ts
import { PasteClient } from "https://deno.land/x/deno_pastebin/mod.ts";

const client = new PasteClient("<devKey here>");
```

Let's create a new paste as a Guest. It does not require user keys.

```ts
const url = await client.create({
  // Required. The content (code) of the paste.
  code: "<content of the paste>",

  // Everything else, OPTIONALS.
  // If empty, it will paste as guest.
  // userKey: "<user token here>",

  // Defaults to "Untitled".
  name: "<title for your paste>",
  // 0 = public, 1 = unlisted, 2 = private
  publicity: 0,
  // Syntax-Highlighting format. Defaults to "text".
  format: "bf", // BrainF*ck
  // Defaults to "N" = never.
  expireDate: "10M", // 10 Minutes
  // Name of an existing folder to save the paste to.
  folderKey: "<folder name>",
});

// "url" is the URL to the new paste.
console.log(url);
```

Oh, wanna create pastes for the user? With user's account? Get a session token
using their password and username.

```ts
const userKey = await client.login("username", "password");
console.log(userKey); // Keep it private.
```

Then you can use that `userKey` for further use, and it can be used to create
new pastes under their account.

> Just like before, try creating a paste but with the parameter `userKey`.

```ts
const url = await client.create({
  code: "<content of the paste>",
  userKey: userKey,
  // ...
});
```

> `url` is the URL to the new paste.

## Available Methods

- [Create a Paste](#create-a-paste) - `create`
- [Login using username and password](#login-using-username-and-password) -
  `login`
- [Delete a paste](#delete-a-paste) - `deletePaste`
- [Get Raw Paste](#get-raw-paste) - `getRaw`
- [Get User's pastes](#get-users-pastes) - `getPastes`
- [Get User account info](#get-user-account-info) - `getUser`

### Create a Paste

In order to create a private paste or on behalf of a user, you need to get
`userKey` first. [See how to get one](#login-using-username-and-password).
Otherwise, the paste will be created in Guest mode, which you cannot delete or
edit after it's creation.

```ts
const client = new PasteClient("DEV_API_KEY");

const url = await client.create({
  code: "const something = 'Hello World!'",
  expireDate: "N",
  format: "typescript",
  name: "hello-world.ts",
  publicity: 0,
});

console.log(url);
```

#### Options

| Name         | Type     | Description                                                                                  | Required |
| ------------ | -------- | -------------------------------------------------------------------------------------------- | -------- |
| `code`       | `string` | The code you want to push                                                                    | `true`   |
| `expireDate` | `string` | Sets the expire date of the paste. [Available expiry dates](https://pastebin.com/doc_api#6). | `false`  |
| `format`     | `string` | The Syntax format. See [available formats](https://pastebin.com/doc_api#5).                  | `false`  |
| `name`       | `string` | The name of your paste (Limit of 100 characters)                                             | `false`  |
| `publicity`  | `number` | `0` Public \| `1` Unlisted \| `2` Private                                                    | `false`  |
| `folderKey`  | `string` | The folder key (id)                                                                          | `false`  |
| `userKey`    | `string` | The user key got from [`client.login()`](#login-using-username-and-password)                 | `false`  |

[Back to Methods](#available-methods)

### Login using username and password

The `userKey` can be used for further usage like, Creating a new paste, Deleting
pastes created by that user, Getting user info and default settings, or to Get
user's private paste's raw content, etc.

```ts
const client = new PasteClient("DEV_API_KEY");
const userKey = await client.login("username", "password");
console.log(userKey);
```

#### Options

| Name       | Type     | Description         | Required |
| ---------- | -------- | ------------------- | -------- |
| `name`     | `string` | The user's name     | `true`   |
| `password` | `string` | The user's password | `true`   |

[Back to Methods](#available-methods)

### Delete a paste

You can only delete user-created (Not created as Guest) pastes. For that you
need `userKey`. [See how to get one](#login-using-username-and-password).

You also need the key of the paste you want to delete - `pasteKey`. Paste key is
the part of the url which comes after `pastebin.com/`.

For example, in `https://pastebin.com/abcd1234`, the `abcd1234` is the key of
the paste.

```ts
const userKey = await client.login("username", "password");
// Will return true if deleted successfully.
const deleted = await client.deletePaste({
  userKey: userKey,
  pasteKey: "paste-key-here",
});
console.log(deleted);
```

#### Options

| Name       | Type     | Description                                                                      | Required |
| ---------- | -------- | -------------------------------------------------------------------------------- | -------- |
| `userKey`  | `string` | The `userKey` returned from [`client.login`](#login-using-username-and-password) | `true`   |
| `pasteKey` | `string` | The key (id) of the paste                                                        | `true`   |

[Back to Methods](#available-methods)

### Get Raw Paste

You can get the raw paste (code) of a paste using this method. To get raw public
or unlisted paste, you can use,

```ts
// Get raw paste from URL
const fromUrl = await client.getRaw("https://pastebin.com/z2qSHJqf");
// Get raw paste from ID
const fromId = await client.getRaw("z2qSHJqf");

// => raw paste string
console.log({ fromUrl, fromId });
```

To get raw paste output of user's pastes including 'private' pastes,

```ts
const userKey = await client.login("username", "password");

// Get raw paste using userKey.
const withUserKey = await pb.getRaw({
  pasteKey: "xxxxxxx",
  userKey: token,
});

// => raw paste string
console.log(withUserKey);
```

#### Options

| Name       | Type     | Description                                                                      | Required |
| ---------- | -------- | -------------------------------------------------------------------------------- | -------- |
| `userKey`  | `string` | The `userKey` returned from [`client.login`](#login-using-username-and-password) | `true`   |
| `pasteKey` | `string` | The key (id) of the paste                                                        | `true`   |

[Back to Methods](#available-methods)

### Get User's pastes

You can list all the pastes created by a user using this method.

```ts
const userKey = await client.login("username", "password");
const pastes = await client.getPastes({
  userKey: userKey,
  limit: 100, // Min: 1, Max: 1000, Default: 50
});
// An array of pastes
console.log(pastes);
```

#### Options

| Name      | Type     | Description                                                                      | Required |
| --------- | -------- | -------------------------------------------------------------------------------- | -------- |
| `userKey` | `string` | The `userKey` returned from [`client.login`](#login-using-username-and-password) | `true`   |
| `limit`   | `number` | The limit of pastes to get                                                       | `false`  |

[Back to Methods](#available-methods)

### Get User Account info

You can obtain a user's personal information and certain settings using this
method.

```ts
const userKey = await client.login("username", "password");
const userInfo = await client.getUser(userKey);
console.log(userInfo);
```

#### Options

| Name      | Type     | Description                                                                      | Required |
| --------- | -------- | -------------------------------------------------------------------------------- | -------- |
| `userKey` | `string` | The `userKey` returned from [`client.login`](#login-using-username-and-password) | `true`   |

[Back to Methods](#available-methods)

---

Pull requests are welcome!

**Made with ❤️**

**Licensed under [MIT](./LICENSE) (c) 2022
[dcdunkan](https://github.com/dcdunkan).**
