"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

type ProviderProps = {
    children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60, // 1 min
                        refetchOnWindowFocus: false,
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <TanStackDevtools
                plugins={[
                    {
                        name: "TanStack Query",
                        render: <ReactQueryDevtoolsPanel />,
                    },
                ]}
            />
            {children}
        </QueryClientProvider>
    );
}
