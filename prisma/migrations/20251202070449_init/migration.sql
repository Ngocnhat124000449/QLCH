-- CreateTable
CREATE TABLE "Users" (
    "UserID" SERIAL NOT NULL,
    "FullName" VARCHAR(100) NOT NULL,
    "Email" VARCHAR(150) NOT NULL,
    "PasswordHash" VARCHAR(255) NOT NULL,
    "PhoneNumber" VARCHAR(20),
    "Address" VARCHAR(255),
    "Role" VARCHAR(20) NOT NULL,
    "AvatarURL" VARCHAR(255),
    "Status" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Cart" (
    "CartID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("CartID")
);

-- CreateTable
CREATE TABLE "CartItems" (
    "CartItemID" SERIAL NOT NULL,
    "CartID" INTEGER NOT NULL,
    "VariantID" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("CartItemID")
);

-- CreateTable
CREATE TABLE "Categories" (
    "CategoryID" SERIAL NOT NULL,
    "CategoryName" VARCHAR(150) NOT NULL,
    "Description" TEXT,
    "ImageURL" VARCHAR(255),
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("CategoryID")
);

-- CreateTable
CREATE TABLE "Products" (
    "ProductID" SERIAL NOT NULL,
    "Name" VARCHAR(200) NOT NULL,
    "Description" TEXT,
    "DetailedDescription" TEXT,
    "BasePrice" DECIMAL(10,2) NOT NULL,
    "ThumbnailURL" VARCHAR(255),
    "Stock" INTEGER NOT NULL,
    "Status" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "CategoryID" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("ProductID")
);

-- CreateTable
CREATE TABLE "ProductImages" (
    "ImageID" SERIAL NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "ImageURL" VARCHAR(255) NOT NULL,
    "Color" VARCHAR(50),
    "DisplayOrder" INTEGER,
    "IsMain" BOOLEAN NOT NULL DEFAULT false,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("ImageID")
);

-- CreateTable
CREATE TABLE "ProductSpecifications" (
    "SpecificationID" SERIAL NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "Name" VARCHAR(100) NOT NULL,
    "Value" VARCHAR(255) NOT NULL,
    "DisplayOrder" INTEGER,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductSpecifications_pkey" PRIMARY KEY ("SpecificationID")
);

-- CreateTable
CREATE TABLE "ProductVariants" (
    "VariantID" SERIAL NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "VariantName" VARCHAR(150) NOT NULL,
    "Color" VARCHAR(50),
    "Storage" VARCHAR(50),
    "Price" DECIMAL(10,2) NOT NULL,
    "Stock" INTEGER NOT NULL,
    "SKU" VARCHAR(100),
    "ImageURL" VARCHAR(255),
    "Status" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariants_pkey" PRIMARY KEY ("VariantID")
);

-- CreateTable
CREATE TABLE "Promotions" (
    "PromotionID" SERIAL NOT NULL,
    "PromotionName" VARCHAR(150) NOT NULL,
    "Code" VARCHAR(50) NOT NULL,
    "DiscountType" VARCHAR(20) NOT NULL,
    "DiscountValue" DECIMAL(10,2) NOT NULL,
    "MinimumOrderValue" DECIMAL(10,2),
    "UsageLimit" INTEGER,
    "UsedCount" INTEGER DEFAULT 0,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Promotions_pkey" PRIMARY KEY ("PromotionID")
);

-- CreateTable
CREATE TABLE "Orders" (
    "OrderID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "OrderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TotalAmount" DECIMAL(10,2) NOT NULL,
    "Status" VARCHAR(50) NOT NULL,
    "ShippingAddress" VARCHAR(255) NOT NULL,
    "PaymentMethod" VARCHAR(50) NOT NULL,
    "Note" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("OrderID")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "OrderItemID" SERIAL NOT NULL,
    "OrderID" INTEGER NOT NULL,
    "VariantID" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "UnitPrice" DECIMAL(10,2) NOT NULL,
    "TotalPrice" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("OrderItemID")
);

-- CreateTable
CREATE TABLE "WishlistItems" (
    "WishlistItemID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "AddedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishlistItems_pkey" PRIMARY KEY ("WishlistItemID")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "ReviewID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "Rating" INTEGER NOT NULL,
    "Comment" TEXT,
    "IsVisible" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("ReviewID")
);

-- CreateTable
CREATE TABLE "InventoryLevels" (
    "InventoryLevelID" SERIAL NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "CurrentStock" INTEGER NOT NULL,
    "LowStockThreshold" INTEGER NOT NULL,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryLevels_pkey" PRIMARY KEY ("InventoryLevelID")
);

-- CreateTable
CREATE TABLE "SalesHistory" (
    "HistoryID" SERIAL NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "SaleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalesHistory_pkey" PRIMARY KEY ("HistoryID")
);

-- CreateTable
CREATE TABLE "ProductDemand" (
    "DemandID" SERIAL NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "Demand" INTEGER NOT NULL,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductDemand_pkey" PRIMARY KEY ("DemandID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_UserID_key" ON "Cart"("UserID");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_CartID_fkey" FOREIGN KEY ("CartID") REFERENCES "Cart"("CartID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_VariantID_fkey" FOREIGN KEY ("VariantID") REFERENCES "ProductVariants"("VariantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES "Categories"("CategoryID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSpecifications" ADD CONSTRAINT "ProductSpecifications_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariants" ADD CONSTRAINT "ProductVariants_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Orders"("OrderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_VariantID_fkey" FOREIGN KEY ("VariantID") REFERENCES "ProductVariants"("VariantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItems" ADD CONSTRAINT "WishlistItems_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItems" ADD CONSTRAINT "WishlistItems_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLevels" ADD CONSTRAINT "InventoryLevels_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesHistory" ADD CONSTRAINT "SalesHistory_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDemand" ADD CONSTRAINT "ProductDemand_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;
