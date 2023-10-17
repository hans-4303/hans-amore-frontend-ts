import createCache from "@emotion/cache";

export default function createEmotionChache() {
  return createCache({
    key: "css",
  });
}
