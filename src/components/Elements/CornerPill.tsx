import React from "react";

export default function CornerPill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="font-sans cursor-default absolute top-0 right-0 m-[18px] uppercase px-4 py-1 rounded-full border border-solid border-stone-500 text-stone-700 bg-stone-50 text-xs">
      {children}
    </p>
  );
}
