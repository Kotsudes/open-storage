"use client";

import * as React from "react";
import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";
import { NavTree } from "@/components/sidebar/nav-tree";
import { NavFlat } from "@/components/sidebar/nav-flat";
import { NavUser } from "@/components/sidebar/nav-user";
import { WarehouseSwitcher } from "@/components/sidebar/warehouse-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

const data = {
    navWarehouse: [
        {
            title: "Storage",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Inventories",
                    url: "/warehouses/inventories",
                },
                {
                    title: "Stock",
                    url: "/warehouses/stock",
                },
            ],
        },
        {
            title: "Catalog",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Products",
                    url: "/products",
                },
                {
                    title: "Units",
                    url: "/units",
                },
            ],
        },
    ],
    navManagement: [
        {
            title: "Warehouse",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Members",
                    url: "/warehouses/members",
                },
                {
                    title: "Roles & Permissions",
                    url: "/warehouses/roles",
                },
            ],
        },
        {
            title: "Monitoring",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Alerts",
                    url: "#",
                },
                {
                    title: "Activity Logs",
                    url: "#",
                },
            ],
        },
    ],
    navPreferences: [
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
        },
        {
            title: "Notifications",
            url: "#",
            icon: Bot,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <WarehouseSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavTree label="WAREHOUSE" items={data.navWarehouse} />
                <NavTree label="MANAGEMENT" items={data.navManagement} />
                <NavFlat
                    label="PREFERENCES"
                    items={data.navPreferences}
                    className="mt-auto"
                />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
