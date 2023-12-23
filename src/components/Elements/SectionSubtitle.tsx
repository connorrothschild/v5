export default function SectionSubtitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2
      className="text-lg md:text-2xl leading-snug font-sans text-left font-normal text-stone-500 mb-2 max-w-3xl"
      style={{
        textWrap: "pretty",
      }}
    >
      {children}
    </h2>
  );
}
