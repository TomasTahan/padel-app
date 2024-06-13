export default function TorneosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className=" md:p-4">{children}</div>;
}
