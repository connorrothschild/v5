export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1
      className="text-3xl md:text-6xl font-sans text-left font-light text-stone-600 mb-2"
      style={{
        textWrap: "balance",
      }}
    >
      {children}
    </h1>
  );
}
