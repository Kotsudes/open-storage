/*
  Warnings:

  - The primary key for the `inventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `inventory` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `warehouseId` on the `inventory` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `inventory_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `inventory_item` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `inventoryId` on the `inventory_item` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `itemId` on the `inventory_item` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `item` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `membership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `membership` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `warehouseId` on the `membership` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `warehouse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `warehouse` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "inventory_item" DROP CONSTRAINT "inventory_item_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "inventory_item" DROP CONSTRAINT "inventory_item_itemId_fkey";

-- DropForeignKey
ALTER TABLE "membership" DROP CONSTRAINT "membership_warehouseId_fkey";

-- AlterTable
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "warehouseId" SET DATA TYPE INTEGER,
ADD CONSTRAINT "inventory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "inventory_item" DROP CONSTRAINT "inventory_item_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "inventoryId" SET DATA TYPE INTEGER,
ALTER COLUMN "itemId" SET DATA TYPE INTEGER,
ADD CONSTRAINT "inventory_item_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "item" DROP CONSTRAINT "item_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "item_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "membership" DROP CONSTRAINT "membership_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "warehouseId" SET DATA TYPE INTEGER,
ADD CONSTRAINT "membership_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "warehouse" DROP CONSTRAINT "warehouse_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "warehouse_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_item" ADD CONSTRAINT "inventory_item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_item" ADD CONSTRAINT "inventory_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
