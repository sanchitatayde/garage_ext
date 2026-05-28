export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="app-frame">{children}</div>;
}
