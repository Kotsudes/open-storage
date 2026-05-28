"use client";

import { useMemo, useState } from "react";
import TrendCard from "@/components/analytics/trend-card";
import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Apple,
    CaseUpper,
    Search,
    Calendar,
    Check,
    Refrigerator,
    Snowflake,
    ShelvingUnit,
    Wine,
    Cuboid,
} from "lucide-react";

import { Inventory, InventoryType } from "@open-storage/shared";
import InventoryList from "./_components/inventory-list";
import InventoryCreateSheet from "./_components/inventory-create-sheet";

const inventories: Inventory[] = [
    {
        id: 1,
        name: "Refrigirateur cuisine",
        type: "FRIDGE",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z"),
        warehouse: {
            id: 1,
            name: "Main Warehouse",
            address: "123 Main St, Anytown, USA",
            createdAt: new Date("2024-01-01T00:00:00Z"),
            updatedAt: new Date("2024-01-01T00:00:00Z"),
        },
    },
    {
        id: 2,
        name: "Cave à vin",
        type: "CELLAR",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z"),
        warehouse: {
            id: 1,
            name: "Main Warehouse",
            address: "123 Main St, Anytown, USA",
            createdAt: new Date("2024-01-01T00:00:00Z"),
            updatedAt: new Date("2024-01-01T00:00:00Z"),
        },
    },
];

export default function Page() {
    const [sortValue, setSortValue] = useState<number>(0);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const selectedInventories = useMemo<Inventory[]>(() => {
        if (selectedFilters.length === 0) return inventories;
        return inventories.filter((inventory) =>
            selectedFilters.includes(inventory.type)
        );
    }, [selectedFilters]);

    const filterOptions: {
        label: string;
        value: InventoryType;
        icon: React.ReactNode;
        color: string;
    }[] = [
        {
            label: "Fridge",
            value: "FRIDGE",
            icon: <Refrigerator />,
            color: "bg-blue-500",
        },
        {
            label: "Freezer",
            value: "FREEZER",
            icon: <Snowflake />,
            color: "bg-cyan-500",
        },
        {
            label: "Pantry",
            value: "PANTRY",
            icon: <Apple />,
            color: "bg-yellow-500",
        },
        {
            label: "Closet",
            value: "CLOSET",
            icon: <ShelvingUnit />,
            color: "bg-gray-500",
        },
        {
            label: "Cellar",
            value: "CELLAR",
            icon: <Wine />,
            color: "bg-green-500",
        },
        {
            label: "Other",
            value: "OTHER",
            icon: <Cuboid />,
            color: "bg-purple-500",
        },
    ];

    const sortOptions = [
        { icon: <CaseUpper className="stroke-3" />, label: "Name" },
        { icon: <Calendar className="stroke-3" />, label: "Date Created" },
        { icon: <Apple className="stroke-3" />, label: "Stock Level" },
    ];

    function handleSortChange() {
        setSortValue((prev) => (prev === 2 ? 0 : prev + 1));
    }

    return (
        <section className="flex flex-1 flex-col gap-6 p-4 pt-0">
            <header className="flex px-4 pt-4 pb-2 md:px-6 md:pt-6 lg:px-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Inventories
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your inventories and stock levels across your
                        warehouse.
                    </p>
                </div>
                <InventoryCreateSheet />
            </header>

            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                        <TrendCard
                            description="Inventories"
                            trend="neutral"
                            value="12"
                            trendDescription="Number of inventories"
                        />
                        <TrendCard
                            description="Stored products"
                            trend="neutral"
                            value="248"
                            trendDescription="Number of products stored across all inventories"
                        />
                        <TrendCard
                            description="Low Stock Alerts"
                            trend="neutral"
                            value="3"
                            trendDescription="Current low stock alerts across all inventories"
                        />
                        <TrendCard
                            description="Cold Storage"
                            trend="neutral"
                            value="2"
                            trendDescription="Number of inventories with cold storage capabilities"
                        />
                    </div>
                </div>
                <div className="px-4 lg:px-6">
                    <div className="flex gap-4 py-4 md:gap-6 md:py-6">
                        <InputGroup className="max-w-xs">
                            <InputGroupInput placeholder="Search..." />
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                                12 results
                            </InputGroupAddon>
                        </InputGroup>

                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={<Button>Filter types</Button>}
                            ></DropdownMenuTrigger>
                            <DropdownMenuContent className="w-auto p-4">
                                {filterOptions.map((item) => {
                                    const isSelected = selectedFilters.includes(
                                        item.value
                                    );
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={item.value}
                                            checked={isSelected}
                                            onClick={() => {
                                                setSelectedFilters((prev) =>
                                                    prev.includes(item.value)
                                                        ? prev.filter(
                                                              (p) =>
                                                                  p !==
                                                                  item.value
                                                          )
                                                        : [...prev, item.value]
                                                );
                                            }}
                                            className={`flex cursor-pointer items-center justify-between gap-2 p-2 ${isSelected ? "bg-muted" : ""}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-white ${item.color}`}
                                                >
                                                    {item.icon}
                                                </span>
                                                <span className="capitalize">
                                                    {item.label}
                                                </span>
                                            </div>
                                            {isSelected ? (
                                                <Check className="h-4 w-4" />
                                            ) : null}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            onClick={handleSortChange}
                            className="flex items-center gap-2"
                        >
                            <span className="flex items-center gap-2">
                                {sortOptions[sortValue].icon}
                                <span>
                                    Sorting by {sortOptions[sortValue].label}
                                </span>
                            </span>
                        </Button>
                    </div>

                    <InventoryList
                        inventories={selectedInventories}
                        sortBy={sortOptions[sortValue].label}
                    />
                </div>
            </div>
        </section>
    );
}
