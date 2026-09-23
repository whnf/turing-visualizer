import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "cn";

function ScrollArea({ className, ...props }: ScrollAreaPrimitive.Root.Props) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    />
  );
}

function ScrollAreaViewport({
  className,
  ...props
}: ScrollAreaPrimitive.Viewport.Props) {
  return (
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      className={cn("size-full overscroll-x-contain", className)}
      {...props}
    />
  );
}

function ScrollAreaContent(props: ScrollAreaPrimitive.Content.Props) {
  return (
    <ScrollAreaPrimitive.Content data-slot="scroll-area-content" {...props} />
  );
}

function ScrollAreaScrollbar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "group/scrollbar flex touch-none bg-muted select-none",
        orientation === "horizontal" ? "h-1.5" : "w-1.5",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className={cn(
          "bg-primary",
          orientation === "horizontal"
            ? "not-group-data-has-overflow-x/scrollbar:invisible"
            : "not-group-data-has-overflow-y/scrollbar:invisible",
        )}
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
};
