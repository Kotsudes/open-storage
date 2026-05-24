import React, { ReactElement } from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Breadcrumbs({ routes = [] }: { routes: string[] }) {
    let fullHref: string | undefined = undefined;
    const breadcrumbItems: ReactElement[] = [];
    let breadcrumbPage: ReactElement = <></>;

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];

        const href: string = fullHref ? `${fullHref}/${route}` : `/${route}`;
        fullHref = href;

        if (i === routes.length - 1) {
            breadcrumbPage = (
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage className="capitalize">
                        {route}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            );
        } else {
            breadcrumbItems.push(
                <React.Fragment key={href}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink className="capitalize" href={href}>
                            {route}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </React.Fragment>
            );
        }
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink className="capitalize" href="/">
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbItems}
                <BreadcrumbSeparator />
                {breadcrumbPage}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
