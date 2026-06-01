import { FlowSwitchFab } from "@/components/shell/FlowSwitchFab";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-frame">
      {children}
      <FlowSwitchFab />
    </div>
  );
}
