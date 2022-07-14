export const IDL = {
  version: "0.1.0",
  name: "root",
  instructions: [
    {
      name: "sendKwek",
      accounts: [
        {
          name: "kwek",
          isMut: true,
          isSigner: true,
        },
        {
          name: "author",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "topic",
          type: "string",
        },
        {
          name: "content",
          type: "string",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "kwek",
      type: {
        kind: "struct",
        fields: [
          {
            name: "author",
            type: "publicKey",
          },
          {
            name: "timestamp",
            type: "i64",
          },
          {
            name: "topic",
            type: "string",
          },
          {
            name: "content",
            type: "string",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "TopicTooLong",
      msg: "The provided topic should be 50 charactes long maximum.",
    },
    {
      code: 6001,
      name: "ContentTooLong",
      msg: "The provided content should be 280 characters long maximum.",
    },
  ],
  metadata: {
    address: "8oLtK62pbTY3N1JcudYvMCt2upANv9BwU7xpwLLdn6VJ",
  },
};
