import { Breadcrumbs } from "@/components/breadcrumbs";
type Props = {
    params: Promise<{
        catchAll: string[];
    }>;
};
export default async function BreadcrumbSlot({ params }: Props) {
    const { catchAll } = await params;

    return <Breadcrumbs routes={catchAll} />;
}
