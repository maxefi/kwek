import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Root } from "../target/types/root";
import { faker } from "@faker-js/faker";
import * as assert from "assert";
import { KwekAccount } from "../app/src/interfaces";

describe("root", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Root as Program<Root>;

  describe("WHEN 'sendKwek' is called", () => {
    const topic = faker.lorem.word();
    const longTopic = faker.datatype.string(51);
    const longTopicErrorMessage =
      "The provided topic should be 50 charactes long maximum.";
    const content = faker.lorem.words();
    const longContent = faker.datatype.string(281);
    const longContentErrorMessage =
      "The provided content should be 280 characters long maximum.";

    /*
     * TODO: fix 'kwekAccount' type
     * let kwekAccount: TypeDef<IdlTypeDef, anchor.IdlTypes<anchor.Idl>>;
     * */
    let kwekAccount: KwekAccount;

    describe("AND only 'kwek' is presented in 'signers'", () => {
      describe("AND 'topic' and 'content' are passed", () => {
        beforeEach(async () => {
          const kwek = anchor.web3.Keypair.generate();

          await program.methods
            .sendKwek(topic, content)
            .accounts({
              kwek: kwek.publicKey,
              author: provider.wallet.publicKey,
              systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([kwek])
            .rpc();

          kwekAccount = (await program.account.kwek.fetch(
            kwek.publicKey
          )) as unknown as KwekAccount;
        });

        it("MUST contain 'author' equals to 'wallet.publicKey'", () => {
          assert.equal(
            kwekAccount.author.toBase58(),
            provider.wallet.publicKey.toBase58()
          );
        });

        it("MUST contain sended 'topic'", () => {
          assert.equal(kwekAccount.topic, topic);
        });

        it("MUST contain sended 'content'", () => {
          assert.equal(kwekAccount.content, content);
        });

        it("MUST contain 'timestamp'", () => {
          assert.ok(kwekAccount.timestamp);
        });
      });

      describe("AND only 'content' is passed", () => {
        beforeEach(async () => {
          const kwek = anchor.web3.Keypair.generate();

          await program.methods
            .sendKwek("", content)
            .accounts({
              kwek: kwek.publicKey,
              author: provider.wallet.publicKey,
              systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([kwek])
            .rpc();

          kwekAccount = (await program.account.kwek.fetch(
            kwek.publicKey
          )) as unknown as KwekAccount;
        });

        it("MUST contain 'author' equals to 'wallet.publicKey'", () => {
          assert.equal(
            kwekAccount.author.toBase58(),
            provider.wallet.publicKey.toBase58()
          );
        });

        it("MUST contain empty 'topic'", () => {
          assert.ok(kwekAccount.topic.length === 0);
        });

        it("MUST contain sended 'content'", () => {
          assert.equal(kwekAccount.content, content);
        });

        it("MUST contain 'timestamp'", () => {
          assert.ok(kwekAccount.timestamp);
        });
      });

      describe("AND 'topic' with 'topic.length' > 50 is passed", () => {
        const longTopic = faker.datatype.string(51);

        it("MUST return corresponding error message", async () => {
          try {
            const kwek = anchor.web3.Keypair.generate();

            await program.methods
              .sendKwek(longTopic, content)
              .accounts({
                kwek: kwek.publicKey,
                author: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
              })
              .signers([kwek])
              .rpc();

            kwekAccount = (await program.account.kwek.fetch(
              kwek.publicKey
            )) as unknown as KwekAccount;
          } catch (error) {
            assert.equal(error.error.errorMessage, longTopicErrorMessage);
            return;
          }
        });

        it("MUST fail", async () => {
          try {
            const kwek = anchor.web3.Keypair.generate();

            await program.methods
              .sendKwek(longTopic, content)
              .accounts({
                kwek: kwek.publicKey,
                author: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
              })
              .signers([kwek])
              .rpc();

            kwekAccount = (await program.account.kwek.fetch(
              kwek.publicKey
            )) as unknown as KwekAccount;
          } catch (error) {
            return;
          }

          assert.fail();
        });
      });

      describe("AND 'content' with 'content.length' > 280 is passed", () => {
        it("MUST return corresponding error message", async () => {
          try {
            const kwek = anchor.web3.Keypair.generate();

            await program.methods
              .sendKwek(topic, longContent)
              .accounts({
                kwek: kwek.publicKey,
                author: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
              })
              .signers([kwek])
              .rpc();

            kwekAccount = (await program.account.kwek.fetch(
              kwek.publicKey
            )) as unknown as KwekAccount;
          } catch (error) {
            assert.equal(error.error.errorMessage, longContentErrorMessage);
            return;
          }
        });

        it("MUST fail", async () => {
          try {
            const kwek = anchor.web3.Keypair.generate();

            await program.methods
              .sendKwek(longTopic, longContent)
              .accounts({
                kwek: kwek.publicKey,
                author: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
              })
              .signers([kwek])
              .rpc();

            kwekAccount = (await program.account.kwek.fetch(
              kwek.publicKey
            )) as unknown as KwekAccount;
          } catch (error) {
            return;
          }

          assert.fail();
        });
      });

      describe("AND both 'topic' with 'topic.length' > 50 AND 'content' with 'content.length' > 280 are passed", () => {
        it("MUST return 'topic' error message", async () => {
          try {
            const kwek = anchor.web3.Keypair.generate();

            await program.methods
              .sendKwek(longTopic, longContent)
              .accounts({
                kwek: kwek.publicKey,
                author: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
              })
              .signers([kwek])
              .rpc();

            kwekAccount = (await program.account.kwek.fetch(
              kwek.publicKey
            )) as unknown as KwekAccount;
          } catch (error) {
            assert.equal(error.error.errorMessage, longTopicErrorMessage);
            return;
          }
        });

        it("MUST fail", async () => {
          try {
            const kwek = anchor.web3.Keypair.generate();

            await program.methods
              .sendKwek(longTopic, longContent)
              .accounts({
                kwek: kwek.publicKey,
                author: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
              })
              .signers([kwek])
              .rpc();

            kwekAccount = (await program.account.kwek.fetch(
              kwek.publicKey
            )) as unknown as KwekAccount;
          } catch (error) {
            return;
          }

          assert.fail();
        });
      });
    });

    describe("AND 'otherUser' is an 'author' and presented in 'signers' AND 'topic' and 'content' are passed", () => {
      let otherUser: anchor.web3.Keypair;

      beforeEach(async () => {
        const kwek = anchor.web3.Keypair.generate();

        otherUser = anchor.web3.Keypair.generate();
        const signature = await program.provider.connection.requestAirdrop(
          otherUser.publicKey,
          1000000000
        );
        await program.provider.connection.confirmTransaction(signature);

        await program.methods
          .sendKwek(topic, content)
          .accounts({
            kwek: kwek.publicKey,
            author: otherUser.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          })
          .signers([otherUser, kwek])
          .rpc();

        kwekAccount = (await program.account.kwek.fetch(
          kwek.publicKey
        )) as unknown as KwekAccount;
      });

      it("MUST contain 'author' equals to 'otherUser.publicKey'", () => {
        assert.equal(
          kwekAccount.author.toBase58(),
          otherUser.publicKey.toBase58()
        );
      });

      it("MUST contain sended 'topic'", () => {
        assert.equal(kwekAccount.topic, topic);
      });

      it("MUST contain sended 'content'", () => {
        assert.equal(kwekAccount.content, content);
      });

      it("MUST contain 'timestamp'", () => {
        assert.ok(kwekAccount.timestamp);
      });
    });
  });
});
