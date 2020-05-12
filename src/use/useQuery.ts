export function getIdToken() {
  return localStorage.getItem("ev-token") || "";
}

export function persistToken(token: string) {
  localStorage.setItem("ev-token", token);
}

export async function useQuery<T>(
  query: string,
  endpoint = "https://dev.ams-pro.de/graphql"
): Promise<T> {
  try {
    const { data } = await (
      await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getIdToken()}`
        },
        body: JSON.stringify({ query })
      })
    ).json();

    return data;
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
    return (null as unknown) as T;
  }
}

export async function useMutation<T, TVariables>(
  mutation: string,
  variables: TVariables
) {
  const { data } = await (
    await fetch("https://dev.ams-pro.de/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getIdToken()}`
      },
      body: JSON.stringify({ query: mutation, variables })
    })
  ).json();
  return data;
}
