"use client";

import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@workspace/ui/components/table";
import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import Image from "next/image";
import { Product } from "@/types";
import Link from "next/link";
import { Link as LucideLink } from "lucide-react";
import { UpdatePrice, UpdateCost, UpdatePriceGbp } from "./updaters";
import { toast } from "sonner";
import { updatePriceGbp } from "@/app/actions/update-shopify";
import { Spinner } from "@workspace/ui/components/spinner";
import { Input } from "@workspace/ui/components/input";

export function ProductTable({ products }: { products: Product[] }) {
  const [normalise, setNormalise] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [gbpRate, setGbpRate] = useState(0.78);
  const [updatingProductId, setUpdatingProductId] = useState<string | null>(
    null
  );
  const groupedProducts = groupProductsByType(products);

  async function handleBatchUpdateGbp() {
    setIsUpdating(true);
    try {
      toast.info(`Starting update for ${products.length} products...`);

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (!product) continue;

        const calculatedPrice = String(
          Math.round((product.price * gbpRate) / 5) * 5
        );

        try {
          setUpdatingProductId(product.id);
          await updatePriceGbp({
            productId: product.id,
            price: calculatedPrice,
          });

          // Wait 500ms between products to avoid rate limiting
          if (i < products.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error(`Failed to update product ${product.id}:`, error);
        } finally {
          setUpdatingProductId(null);
        }
      }

      toast.success(`Finished updating ${products.length} products!`);
    } catch (error) {
      toast.error("Update process failed");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleBatchUpdateGbp}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update All GBP"}
          </Button>
          <Button variant="outline" onClick={() => setNormalise(!normalise)}>
            {normalise ? "Revert" : "Normalise GBP"}
          </Button>
          <Input
            type="number"
            className="w-[110px]"
            placeholder="GBP Rate"
            value={gbpRate}
            onChange={(e) => setGbpRate(Number(e.target.value))}
            step={0.01}
            min={0}
            max={2}
          />
        </div>
      </div>
      <Separator />
      <Table>
        <TableCaption>Products</TableCaption>
        <TableHeader className="bg-background sticky top-0 z-10">
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Link</TableHead>
            <TableHead className="w-[80px]">GBP Price</TableHead>
            <TableHead className="w-[80px]">New GBP Price</TableHead>
            <TableHead className="w-[80px]">USD Price</TableHead>
            <TableHead className="w-[80px]">New USD Price</TableHead>
            <TableHead className="w-[80px]">COGs %</TableHead>
            <TableHead className="w-[80px]">Cost</TableHead>
            <TableHead className="w-[80px]">New Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedProducts).map(([type, typeProducts]) => (
            <ProductGroup
              key={type}
              type={type}
              products={typeProducts}
              normalise={normalise}
              gbpRate={gbpRate}
              updatingProductId={updatingProductId}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ProductRow({
  product,
  normalise,
  gbpRate,
  updatingProductId,
}: {
  product: any;
  normalise: boolean;
  gbpRate: number;
  updatingProductId: string | null;
}) {
  const margin = product.cost ? (product.cost / product.price) * 100 : 0;
  const isUpdating = updatingProductId === product.id;

  return (
    <TableRow key={product.id} className={isUpdating ? "bg-muted/50" : ""}>
      <TableCell>
        <Image
          src={product.image}
          alt={product.name}
          width={50}
          height={50}
          className="rounded-md"
        />
      </TableCell>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          {product.name}
          {isUpdating && <Spinner className="size-4" />}
        </div>
      </TableCell>
      <TableCell>{product.type}</TableCell>
      <TableCell>
        <Button variant="outline" asChild>
          <Link
            href={`https://admin.shopify.com/store/cornelia-james-ltd/products/${product.id}`}
            target="_blank"
          >
            <LucideLink className="h-4 w-4" /> View
          </Link>
        </Button>
      </TableCell>
      <TableCell>£{Math.round(product.priceGbp)}</TableCell>
      <TableCell>
        <UpdatePriceGbp
          product={product}
          normalise={normalise}
          gbpRate={gbpRate}
        />
      </TableCell>
      <TableCell>${Math.round(product.price)}</TableCell>
      <TableCell>
        <UpdatePrice product={product} normalise={normalise} />
      </TableCell>
      <TableCell>{margin.toFixed(0)}%</TableCell>
      <TableCell>${product.cost ? product.cost : "0.00"}</TableCell>
      <TableCell>
        <UpdateCost product={product} />
      </TableCell>
    </TableRow>
  );
}

// Utility function to group products
function groupProductsByType(products: Product[]): {
  [key: string]: Product[];
} {
  return products.reduce(
    (groups, product) => {
      const type = product.type || "Other";
      if (!groups[type]) groups[type] = [];
      groups[type].push(product);
      return groups;
    },
    {} as { [key: string]: Product[] }
  );
}

// Component for rendering a product group
function ProductGroup({
  type,
  products,
  normalise,
  gbpRate,
  updatingProductId,
}: {
  type: string;
  products: Product[];
  normalise: boolean;
  gbpRate: number;
  updatingProductId: string | null;
}) {
  return (
    <React.Fragment>
      <TableRow className="bg-muted/30">
        <TableCell colSpan={11} className="text-muted-foreground font-semibold">
          {type} ({products.length} products)
        </TableCell>
      </TableRow>
      {products.map((product) => (
        <ProductRow
          key={product.id}
          product={product}
          normalise={normalise}
          gbpRate={gbpRate}
          updatingProductId={updatingProductId}
        />
      ))}
    </React.Fragment>
  );
}
