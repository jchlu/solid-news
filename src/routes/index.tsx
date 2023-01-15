import { A } from "solid-start";
import { For } from "solid-js";
import { createServerData$ } from "solid-start/server"; 
import UserComponent from './user'
export function routeData() {
  return createServerData$(async () => {
      const response = await fetch("https://api.twitter.com/2/tweets/search/recent?query=from:freeCodeCamp",
          {
method: "GET",
"headers": {
"Authorization": `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
}
});
      const { data: json } = await response.json();
      // console.log(JSON.stringify(json, null, 2));
      return json;
      });
// console.log('Env Variables:', import.meta.env);
}

export default function Home() {
const tweets = routeData();
  return (
      <main class="text-center mx-auto text-gray-700 p-4">
      <UserComponent />
      <ul>
      <For each={tweets()}>
        {(tweet) => <li>{tweet.text}</li>}
      </For>
    </ul>
      <p class="mt-8">
      Visit{" "}
      <a
      href="https://solidjs.com"
      target="_blank"
      class="text-sky-600 hover:underline"
      >
      solidjs.com
      </a>{" "}
      to learn how to build Solid apps.
      </p>
      <p class="my-4">
      <span>Home</span>
      {" - "}
      <A href="/about" class="text-sky-600 hover:underline">
      About Page
      </A>{" "}
      </p>
        </main>
        );
}
