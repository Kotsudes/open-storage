"use client";

import { useMemo } from "react";
import { Inventory } from "@open-storage/shared";
import InventoryCard from "./inventory-card";

export default function InventoryList({
    inventories,
    sortBy = "Name",
}: {
    inventories: Inventory[];
    sortBy?: string;
}) {
    const sorted = useMemo<Inventory[]>(() => {
        if (!inventories) return [];
        const copy = [...inventories];
        switch (sortBy) {
            case "Date Created":
                return copy.sort(
                    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
                );
            case "Stock Level":
                // placeholder: inventories don't currently have stock, keep original order
                return copy;
            case "Name":
            default:
                return copy.sort((a, b) => a.name.localeCompare(b.name));
        }
    }, [inventories, sortBy]);

    return (
        <div className="*:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {sorted.map((inv) => (
                <InventoryCard key={inv.id.toString()} inventory={inv} />
            ))}
        </div>
    );
}
