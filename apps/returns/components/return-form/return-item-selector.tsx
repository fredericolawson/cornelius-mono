"use client";

import Image from "next/image";
import type { Order, OrderItem } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";

export function ReturnItemSelector({
  order,
  selectedItems,
  setSelectedItems,
}: {
  order: Order;
  selectedItems: OrderItem[];
  setSelectedItems: (items: OrderItem[]) => void;
}) {
  const handleItemToggle = (item: OrderItem, checked: boolean) => {
    if (checked) {
      setSelectedItems([
        ...selectedItems,
        { ...item, returnReason: "OTHER", returnReasonNote: "" },
      ]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    }
  };

  const handleReasonChange = (itemId: string, reason: string) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === itemId ? { ...item, returnReasonNote: reason } : item
      )
    );
  };

  if (order.returnableItems.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Returnable Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            All items from this order have already been returned.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Items to Return</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {order.returnableItems.map((item) => {
          const isSelected = selectedItems.some((i) => i.id === item.id);
          const selectedItem = selectedItems.find((i) => i.id === item.id);

          return (
            <div key={item.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-4">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity} × {order.currencyCode}{" "}
                    {item.value.toFixed(2)}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    Total: {order.currencyCode}{" "}
                    {(item.value * item.quantity).toFixed(2)}
                  </p>
                </div>
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    handleItemToggle(item, !!checked)
                  }
                />
              </div>

              {isSelected && (
                <div className="space-y-2">
                  <Label htmlFor={`reason-${item.id}`}>
                    Reason for Return (Required)
                  </Label>
                  <Textarea
                    id={`reason-${item.id}`}
                    placeholder="Please tell us why you're returning this item..."
                    value={selectedItem?.returnReasonNote || ""}
                    onChange={(e) =>
                      handleReasonChange(item.id, e.target.value)
                    }
                    required
                  />
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
