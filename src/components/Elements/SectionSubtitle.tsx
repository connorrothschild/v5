export default function SectionSubtitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2
      className="text-lg md:text-[1.35rem] leading-snug font-sans text-left font-light text-stone-500 mb-2 max-w-3xl"
      style={{
        textWrap: "balance",
      }}
    >
      {children}
    </h2>
  );
}
