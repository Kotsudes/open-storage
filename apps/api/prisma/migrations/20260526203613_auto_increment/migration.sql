-- AlterTable
ALTER TABLE "account" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
CREATE SEQUENCE inventory_id_seq;
ALTER TABLE "inventory" ALTER COLUMN "id" SET DEFAULT nextval('inventory_id_seq');
ALTER SEQUENCE inventory_id_seq OWNED BY "inventory"."id";

-- AlterTable
CREATE SEQUENCE inventory_item_id_seq;
ALTER TABLE "inventory_item" ALTER COLUMN "id" SET DEFAULT nextval('inventory_item_id_seq'),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE inventory_item_id_seq OWNED BY "inventory_item"."id";

-- AlterTable
CREATE SEQUENCE item_id_seq;
ALTER TABLE "item" ALTER COLUMN "id" SET DEFAULT nextval('item_id_seq');
ALTER SEQUENCE item_id_seq OWNED BY "item"."id";

-- AlterTable
CREATE SEQUENCE membership_id_seq;
ALTER TABLE "membership" ALTER COLUMN "id" SET DEFAULT nextval('membership_id_seq'),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE membership_id_seq OWNED BY "membership"."id";

-- AlterTable
CREATE SEQUENCE unit_id_seq;
ALTER TABLE "unit" ALTER COLUMN "id" SET DEFAULT nextval('unit_id_seq');
ALTER SEQUENCE unit_id_seq OWNED BY "unit"."id";

-- AlterTable
CREATE SEQUENCE warehouse_id_seq;
ALTER TABLE "warehouse" ALTER COLUMN "id" SET DEFAULT nextval('warehouse_id_seq');
ALTER SEQUENCE warehouse_id_seq OWNED BY "warehouse"."id";
