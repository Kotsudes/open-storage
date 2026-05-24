import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Inventory } from "@open-storage/shared";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Apple,
    Cuboid,
    Ellipsis,
    Refrigerator,
    ShelvingUnit,
    Snowflake,
    Wine,
} from "lucide-react";

function iconAndColorFromType(type: Inventory["type"]) {
    switch (type) {
        case "FRIDGE":
            return {
                icon: <Refrigerator className="h-6 w-6" />,
                color: "bg-blue-500",
                cardTone: "from-blue-500/10 to-card",
            };
        case "FREEZER":
            return {
                icon: <Snowflake className="h-6 w-6" />,
                color: "bg-blue-500",
                cardTone: "from-cyan-500/10 to-card",
            };
        case "PANTRY":
            return {
                icon: <Apple className="h-6 w-6" />,
                color: "bg-green-500",
                cardTone: "from-emerald-500/10 to-card",
            };
        case "CLOSET":
            return {
                icon: <ShelvingUnit className="h-6 w-6" />,
                color: "bg-yellow-500",
                cardTone: "from-amber-500/10 to-card",
            };
        case "CELLAR":
            return {
                icon: <Wine className="h-6 w-6" />,
                color: "bg-purple-500",
                cardTone: "from-fuchsia-500/10 to-card",
            };
        case "OTHER":
            return {
                icon: <Cuboid className="h-6 w-6" />,
                color: "bg-gray-500",
                cardTone: "from-slate-500/10 to-card",
            };
    }
}

export default function InventoryCard({
    inventory,
    className,
}: {
    inventory: Inventory;
    className?: string;
}) {
    const { icon, color, cardTone } = iconAndColorFromType(inventory.type);
    // runtime-derived counts (backend may include inventoryItems)
    const maybe = inventory as unknown as { inventoryItems?: unknown };

    const items = useMemo(() => {
        if (Array.isArray(maybe.inventoryItems)) {
            return maybe.inventoryItems as Array<{ quantity?: number }>;
        }
        return [] as Array<{ quantity?: number }>;
    }, [maybe.inventoryItems]);

    const itemCount = items.length;
    let lowStockCount = 0;
    for (const it of items) {
        if (Number(it.quantity ?? 0) <= 5) {
            lowStockCount += 1;
        }
    }

    const updatedLabel = useMemo(() => {
        const d = new Date(inventory.updatedAt);
        return d.toLocaleString("fr-FR", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    }, [inventory.updatedAt]);

    return (
        <Card
            className={cn(
                "@container/card bg-linear-to-t shadow-xs",
                cardTone,
                "group",
                className
            )}
        >
            <CardHeader className="flex items-start gap-3">
                <div className="flex-1">
                    <CardTitle className="text-base font-semibold">
                        {inventory.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground flex items-center gap-2 text-sm">
                        <span className="text-[11px] tracking-wider uppercase">
                            {inventory.type}
                        </span>
                        <span>•</span>
                        <span>{updatedLabel}</span>
                    </CardDescription>
                </div>

                <CardAction>
                    <span
                        className={cn(
                            "inline-flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm",
                            color
                        )}
                        aria-hidden
                    >
                        {icon}
                    </span>
                </CardAction>
            </CardHeader>

            <CardContent className="grid grid-cols-3 items-center gap-4">
                <div className="col-span-2">
                    <div className="flex items-baseline gap-3">
                        <div className="text-2xl font-semibold">
                            {itemCount}
                        </div>
                        <div className="text-muted-foreground text-sm">
                            produits en stock
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <Badge
                            variant={
                                lowStockCount > 0 ? "destructive" : "secondary"
                            }
                        >
                            {lowStockCount} alertes
                        </Badge>
                        {inventory.temperature !== undefined && (
                            <div className="text-muted-foreground text-sm">
                                Température: {inventory.temperature}°C
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <Button size="sm">Ouvrir</Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Plus d'actions"
                    >
                        <Ellipsis />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
