"use client";

import { useState } from "react";
import type { Order, OrderItem, ReturnType } from "@/types";
import { ReturnItemSelector } from "./return-item-selector";
import { ReturnOptions } from "./return-options";
import { ShippingSelector } from "./shipping-selector";
import { ReturnConfirmation } from "./return-confirmation";
import { SubmitButton } from "./submit-button";
import { calculateRestockingFee } from "@/lib/calculations/restocking-fee";
import { calculateShippingFee } from "@/lib/calculations/shipping-fee";
import { calculateTotalFee } from "@/lib/calculations/total-fee";
import { calculateStoreCreditAmount } from "@/lib/calculations/store-credit";

export function ReturnFormWrapper({ order }: { order: Order }) {
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [returnType, setReturnType] = useState<ReturnType | null>(null);
  const [includeShipping, setIncludeShipping] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Calculate fees
  const discountedSubtotal = selectedItems.reduce(
    (sum, item) => sum + item.discountedTotal * item.quantity,
    0
  );

  // Calculate fees for Refund returns
  const {
    percentage: refundRestockingPercentage,
    explainer: refundRestockingExplainer,
  } = calculateRestockingFee("Refund", selectedItems.length);
  const refundShippingFee = calculateShippingFee(
    order.shippingService,
    "Refund",
    includeShipping
  );
  const {
    calculatedTotalFee: refundTotalFee,
    taxDeduction: refundTaxDeduction,
    restockingFee: refundRestockingFee,
  } = calculateTotalFee({
    returnType: "Refund",
    discountedSubtotal,
    taxRate: order.taxRate,
    countryCode: order.countryCode,
    restockingPercentage: refundRestockingPercentage,
    shippingFee: refundShippingFee,
  });

  // Calculate fees for Credit returns (for explainer text)
  const { explainer: creditRestockingExplainer } = calculateRestockingFee(
    "Credit",
    selectedItems.length
  );

  // Calculate amounts
  const storeCreditAmount = calculateStoreCreditAmount(discountedSubtotal);
  const refundAmount = discountedSubtotal - refundTotalFee;

  // Get the actual shipping fee for the selected return type (for submission)
  const selectedShippingFee =
    returnType === "Refund"
      ? refundShippingFee
      : calculateShippingFee(order.shippingService, "Credit", includeShipping);

  // Check if form can be submitted
  const canSubmit =
    selectedItems.length > 0 && returnType !== null && confirmed;

  return (
    <div className="space-y-6">
      <ReturnItemSelector
        order={order}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />

      {selectedItems.length > 0 && (
        <>
          <ReturnOptions
            order={order}
            returnType={returnType}
            setReturnType={setReturnType}
            discountedSubtotal={discountedSubtotal}
            storeCreditAmount={storeCreditAmount}
            refundAmount={refundAmount}
            taxDeduction={refundTaxDeduction}
            restockingFee={refundRestockingFee}
            restockingExplainer={refundRestockingExplainer}
          />

          {returnType === "Refund" && (
            <ShippingSelector
              order={order}
              includeShipping={includeShipping}
              setIncludeShipping={setIncludeShipping}
            />
          )}

          <ReturnConfirmation
            confirmed={confirmed}
            setConfirmed={setConfirmed}
          />

          <SubmitButton
            order={order}
            selectedItems={selectedItems}
            returnType={returnType}
            includeShipping={includeShipping}
            shippingFee={selectedShippingFee}
            storeCreditAmount={storeCreditAmount}
            canSubmit={canSubmit}
          />
        </>
      )}
    </div>
  );
}
