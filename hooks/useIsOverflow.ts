import * as React from "react";

export const useIsOverflow = (ref, callback?) => {
  const [isOverflow, setIsOverflow] = React.useState<boolean | undefined>(
    undefined
  );

  React.useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current.scrollWidth > current.clientWidth;

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      if ("ResizeObserver" in window) {
        new ResizeObserver(trigger).observe(current);
      }
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
