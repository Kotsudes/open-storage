"use client";

import { useState } from "react";
import { AudioWaveform, ChevronsUpDown, Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import WarehouseCreateSheet from "./warehouse-create-sheet";
import { useQuery } from "@tanstack/react-query";
import { Warehouse } from "@open-storage/shared";
import { authClient } from "@/lib/auth-client";
import { apiRequest } from "@/lib/api";

export function WarehouseSwitcher() {
    const { isMobile } = useSidebar();
    const { data: session, isPending } = authClient.useSession();

    const { data: warehouses } = useQuery<Warehouse[]>({
        queryKey: ["warehouses", session?.user.id],
        enabled: !!session?.user.id,
        queryFn: async () => {
            return apiRequest<Warehouse[]>(
                "/warehouses/users",
                "POST",
                undefined
            );
        },
    });

    const [activeWarehouse, setActiveWarehouse] = useState(0);

    const [open, setOpen] = useState(false);

    if (isPending || !session || !warehouses) {
        return null;
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <AudioWaveform className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {warehouses[activeWarehouse]?.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {warehouses[activeWarehouse]?.address}
                                    </span>
                                </div>
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        }
                    />

                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-muted-foreground text-xs">
                                Warehouses
                            </DropdownMenuLabel>
                            {warehouses?.map((warehouse, index) => (
                                <DropdownMenuItem
                                    key={warehouse.name}
                                    onClick={() => setActiveWarehouse(index)}
                                    className="gap-2 p-2"
                                >
                                    <div className="flex size-6 items-center justify-center rounded-md border">
                                        <AudioWaveform className="size-3.5 shrink-0" />
                                    </div>
                                    {warehouse.name}
                                    <DropdownMenuShortcut>
                                        ⌘{index + 1}
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.preventDefault();
                                setOpen(true);
                            }}
                        >
                            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <Plus className="size-4" />
                            </div>
                            <div className="text-muted-foreground font-medium">
                                Add a warehouse
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
            <WarehouseCreateSheet open={open} setOpen={setOpen} />
        </SidebarMenu>
    );
}
