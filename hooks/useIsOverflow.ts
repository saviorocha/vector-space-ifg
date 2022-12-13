import * as React from "react";
import { useListContext } from "../context";

export const useIsOverflow = (ref: any) => {
  const { stateVecArr } = useListContext()
  const [isOverflow, setIsOverflow] = React.useState<boolean | undefined>(
    undefined
  );

  React.useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current.scrollWidth > current.clientWidth;

      setIsOverflow(hasOverflow);
    };

    if (current) {
      if ("ResizeObserver" in window) {
        new ResizeObserver(trigger).observe(current);
      }
      trigger();
    }
  }, [ref, stateVecArr]);

  return isOverflow;
};
