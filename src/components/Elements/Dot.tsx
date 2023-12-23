import React from "react";

export default function Dot({ classes }: { classes?: string }) {
  return (
    <div
      className={`w-3 h-3 rounded-full animate-gradient bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 ${classes}`}
    />
  );
}
