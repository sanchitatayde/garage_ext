import { MenuDrawer } from "@/components/shell/MenuDrawer";
import { BottomTabBar } from "@/components/shell/BottomTabBar";
import { FlowSwitchFab } from "@/components/shell/FlowSwitchFab";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto max-w-[430px] h-[100dvh] bg-surface overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <BottomTabBar />
      <MenuDrawer />
      {/* Sits above the BottomTabBar so it never gets obscured. */}
      <FlowSwitchFab bottomClass="bottom-20" />
    </div>
  );
}
