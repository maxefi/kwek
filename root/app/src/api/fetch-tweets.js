import { useWorkspace } from "@/composables";

export const fetchTweets = async () => {
  const { program } = useWorkspace();

  const tweets = await program.value.account.kwek.all();

  return tweets;
};
