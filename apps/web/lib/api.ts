// Fait une fonction pour faire une requete api GET / POST/ PUT / PATCH / DELETE
// La fonction doit prendre en parametre l'url, la methode, les headers et le body
// La fonction doit retourner la reponse de l'api
// La fonction doit gerer les erreurs et retourner un message d'erreur en cas d'erreur

export async function apiRequest<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    headers?: Record<string, string>,
    body?: unknown
): Promise<T> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
            {
                method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "API request failed");
        }

        return (await response.json()) as T;
    } catch (error) {
        console.error("API request error:", error);
        const message =
            error instanceof Error
                ? error.message
                : "An unexpected error occurred";
        throw new Error(message);
    }
}
