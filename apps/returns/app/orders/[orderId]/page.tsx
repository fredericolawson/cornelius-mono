import { getOrder as getShopifyOrder } from "@workspace/shopify/queries/get-order";
import { mapOrder } from "@/lib/services/order-mapper";
import { OrderSummary } from "@/components/order-details/order-summary";
import { ExistingReturnsList } from "@/components/order-details/existing-returns-list";
import { ReturnFormWrapper } from "@/components/return-form/return-form-wrapper";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const shopifyOrder = await getShopifyOrder(orderId);
  const order = mapOrder(shopifyOrder);

  return (
    <div className="flex flex-col gap-6">
      <OrderSummary order={order} />
      {order.returnIds.length > 0 && (
        <ExistingReturnsList
          orderName={order.name}
          returnIds={order.returnIds}
        />
      )}
      <ReturnFormWrapper order={order} />
    </div>
  );
}
