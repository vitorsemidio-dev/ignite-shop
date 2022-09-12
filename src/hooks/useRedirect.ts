import { useRouter } from "next/router";

export function useRedirect() {
  const router = useRouter();

  const redirect = async (
    url: string,
    options: { external: boolean },
  ): Promise<void> => {
    const { external } = options;
    if (external) {
      window.location.href = url;
      return;
    } else {
      await router.push(url);
    }
  };

  return { redirect };
}
