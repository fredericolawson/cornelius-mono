"use client";

import { useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@workspace/ui/components/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { Separator } from "@workspace/ui/components/separator";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import Image from "next/image";
import { Collection } from "@/types";

export function CollectionsTable({
  collections,
}: {
  collections: Collection[];
}) {
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Collections</h1>
        </div>
        <Separator />
        <Table>
          <TableCaption>Collections ({collections.length} total)</TableCaption>
          <TableHeader className="bg-background sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead className="w-[120px]">Product Count</TableHead>
              <TableHead className="w-[150px]">Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map((collection) => (
              <CollectionRow
                key={collection.id}
                collection={collection}
                onClick={() => setSelectedCollection(collection)}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet
        open={!!selectedCollection}
        onOpenChange={(open) => !open && setSelectedCollection(null)}
      >
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{selectedCollection?.title}</SheetTitle>
            <SheetDescription>
              {selectedCollection?.products.length}{" "}
              {selectedCollection?.products.length === 1
                ? "product"
                : "products"}{" "}
              in this collection
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-120px)] mt-6">
            <div className="space-y-2 pr-4">
              {selectedCollection?.products.length ? (
                selectedCollection.products.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 border rounded-md bg-background hover:bg-muted/50 transition-colors"
                  >
                    <p className="text-sm font-medium">{product.title}</p>
                    {product.category && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Category: {product.category}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      ID: {product.id}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No products in this collection
                </p>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}

function CollectionRow({
  collection,
  onClick,
}: {
  collection: Collection;
  onClick: () => void;
}) {
  const formattedDate = new Date(collection.updatedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <TableRow className="cursor-pointer hover:bg-muted/50" onClick={onClick}>
      <TableCell>
        {collection.image ? (
          <Image
            src={collection.image}
            alt={collection.title}
            width={50}
            height={50}
            className="rounded-md"
          />
        ) : (
          <div className="w-[50px] h-[50px] bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">
            No image
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{collection.title}</TableCell>
      <TableCell>{collection.products.length}</TableCell>
      <TableCell className="text-muted-foreground">{formattedDate}</TableCell>
    </TableRow>
  );
}
