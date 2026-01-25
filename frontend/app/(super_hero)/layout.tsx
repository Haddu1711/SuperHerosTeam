export default function SuperHeroLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-6xl mx-auto p-6 space-y-6">{children}</div>;
}
