import { For } from "solid-js";
import { createServerAction$ } from 'solid-start/server';
export default function UserComponent() {
  const [tweets, { Form }] = createServerAction$(async (formData: FormData) => {
    const username = formData.get("username");
    console.log(username);
      const response = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=from:${username}`,
          {
method: "GET",
"headers": {
"Authorization": `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
}
  });
      const { data: json } = await response.json();
  return json;
});
 
  return (
  <>
    <Form>
      <label for="username">Username:</label>
      <input type="text" name="username" />
      <input type="submit" value="submit" />
    </Form>
      <ul>
      <For each={tweets.result}>
        {(tweet) => <li>{tweet.text}</li>}
      </For>
    </ul>
    </>
  );
}
