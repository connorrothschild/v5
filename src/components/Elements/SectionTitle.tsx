export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1
      className="text-3xl md:text-6xl font-serif text-left font-normal text-stone-700 mb-2"
      style={{
        textWrap: "balance",
      }}
    >
      {children}
    </h1>
  );
}
