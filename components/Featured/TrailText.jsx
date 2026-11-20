import React, { useEffect, useState } from "react";
import { useTrail, a } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export const Trail = ({ children, callback, ...props }) => {
  const items = React.Children.toArray(children);
  const [ref, open] = useInView({ rootMargin: "-50px 0px" });

  const [targetHeight, setTargetHeight] = useState(140);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setTargetHeight(48);
      else if (w < 640) setTargetHeight(60);
      else if (w < 768) setTargetHeight(75);
      else if (w < 1024) setTargetHeight(100);
      else setTargetHeight(140);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 1000, friction: 200 },
    opacity: open ? 1 : 0,
    y: 20,
    height: targetHeight,
    from: { opacity: 0, y: 20, height: 0 },
    onRest: () => {
      if (typeof callback === "function") callback(open);
    },
  });

  return (
    <div {...props} ref={ref}>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};
