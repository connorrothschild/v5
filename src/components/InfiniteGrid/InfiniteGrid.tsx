import { Box, useBreakpointValue } from "@chakra-ui/react";
import { useComponentSize } from "react-use-size";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { autorun } from "mobx";
import * as React from "react";
import { Grid, Vector } from "./utils";
import { useGesture } from "@use-gesture/react";
// @ts-ignore
import { Lethargy } from "lethargy";

const lethargy = new Lethargy(15, 12, 0.05);

const MotionBox = motion(Box);

const ItemComp = ({ item, children }: { item: any; children: any }) => {
  const x = useMotionValue(item.center.x);
  const y = useMotionValue(item.center.y);

  React.useEffect(() => {
    return autorun(() => {
      x.set(item.center.x);
      y.set(item.center.y);
    });
  }, []);

  return (
    <MotionBox pos="absolute" w={item.width} h={item.height} style={{ x, y }}>
      {children}
    </MotionBox>
  );
};

interface InfiniteGridProps {
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}

export const InfiniteGrid = ({
  width = "100%",
  height = "100%",
  children,
}: InfiniteGridProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const content = useComponentSize();
  const config = useBreakpointValue({
    base: { mass: 0.2, damping: 28, stiffness: 200 }, // snappier transitions on small screens
    md: { mass: 0.25, damping: 40, stiffness: 200 }, // more damping on large screens
  });

  const grid = React.useMemo(
    () =>
      new Grid({
        width: content.width,
        height: content.height,
      }),
    [content.width, content.height]
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springs = {
    x: useSpring(0, config),
    y: useSpring(0, config),
  };

  useMotionValueEvent(springs.x, "change", (val) => {
    grid.setCameraPosition(
      new Vector({
        x: val,
        y: springs.y.get(),
      })
    );
  });

  useMotionValueEvent(springs.y, "change", (val) => {
    grid.setCameraPosition(
      new Vector({
        x: springs.x.get(),
        y: val,
      })
    );
  });

  const initialOffsetRef = React.useRef({ x: 0, y: 0 });

  useGesture(
    {
      onDragStart: ({ event, offset: [x, y] }) => {
        event.preventDefault();
        initialOffsetRef.current.x = springs.x.get() + x;
        initialOffsetRef.current.y = springs.y.get() + y;
      },
      onDrag: ({ event, offset: [x, y] }) => {
        event.preventDefault();
        springs.x.set(initialOffsetRef.current.x - x);
        springs.y.set(initialOffsetRef.current.y - y);
      },
      onDragEnd: ({
        event,
        offset: [x, y],
        velocity: [vx, vy],
        direction: [dx, dy],
      }) => {
        // add some inertia at end of drag
        // event.preventDefault();
        springs.x.set(initialOffsetRef.current.x - x - dx * vx * 180);
        springs.y.set(initialOffsetRef.current.y - y - dy * vy * 180);
      },
      // onWheel: ({ event, delta: [dx, dy] }) => {
      //   event.preventDefault();
      //   if (lethargy.check(event) !== false) {
      //     springs.x.set(springs.x.get() + dx * 5);
      //     springs.y.set(springs.y.get() + dy * 5);
      //   }
      // },
    },
    { target: containerRef, wheel: { eventOptions: { passive: false } } }
  );

  React.useEffect(() => {
    return autorun(() => {
      x.set(-grid.cameraPosition.x);
      y.set(-grid.cameraPosition.y);
    });
  }, [grid]);

  return (
    <Box key={grid.id} w={width} h={height} overflow="hidden">
      <MotionBox
        ref={containerRef}
        w="100%"
        h="100%"
        pos="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ x, y, touchAction: "none" }}
        willChange={"transform"}
      >
        <Box pos="absolute" inset={0}>
          <Box
            // to measure the size of the content
            ref={content.ref}
            display="inline-block"
            visibility="hidden"
            minH="100%"
            minW="100%"
          >
            {children}
          </Box>
        </Box>
        {grid.items.map((item) => (
          <ItemComp key={item.id} item={item}>
            {children}
          </ItemComp>
        ))}
      </MotionBox>
    </Box>
  );
};
