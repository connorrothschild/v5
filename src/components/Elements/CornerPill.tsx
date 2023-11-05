import React from "react";

export default function CornerPill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="sticky font-sans cursor-default w-max ml-auto top-4 lg:top-12 right-0 uppercase px-6 py-1.5 rounded-full border border-solid border-stone-900 bg-stone-800 text-stone-50 text-xs">
      {children}
    </p>
  );
}
