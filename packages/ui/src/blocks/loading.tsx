import { CenterLayout } from "@workspace/ui/components/center-layout";
import { Spinner } from "@workspace/ui/components/spinner";

export function LoadingBlock() {
  return (
    <CenterLayout>
      <Spinner />
    </CenterLayout>
  );
}
