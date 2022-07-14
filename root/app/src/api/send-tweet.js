import { web3 } from "@project-serum/anchor";
import { useWorkspace } from "@/composables";
import { Tweet } from "@/models";

export const sendTweet = async (topic, content) => {
  const { wallet, program } = useWorkspace();

  const tweet = web3.Keypair.generate();

  await program.value.rpc.sendKwek(topic, content, {
    accounts: {
      author: wallet.value.publicKey,
      kwek: tweet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [tweet],
  });

  const tweetAccount = await program.value.account.kwek.fetch(tweet.publicKey);

  return new Tweet(tweet.publicKey, tweetAccount);
};
