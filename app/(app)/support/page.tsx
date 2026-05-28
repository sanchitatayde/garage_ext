import { AppHeader } from "@/components/shell/AppHeader";

export default function SupportStub() {
  return (
    <>
      <AppHeader title="Support" subtitle="24/7 chat service" />
      <section className="px-5 py-5 space-y-2">
        <p className="text-[13px] text-muted">
          {/* TODO: gate 7 builds templatized FAQ + chat */}
          Stub — templatized FAQ comes in gate 7.
        </p>
      </section>
    </>
  );
}
