"use client";
import Link from "next/link";
import { FileText, Camera, ChevronRight } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { Chip } from "@/components/ui/Chip";
import type { Task } from "@/types";

export function TaskRow({ task }: { task: Task }) {
  const Icon = task.type === "doc" ? FileText : Camera;
  return (
    <Link
      href={`/claims/${task.claimRef}`}
      className="w-full flex items-center gap-3 p-3 hover:bg-surface-sunken transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
    >
      <IconTile tone="neutral" size="md">
        <Icon size={18} />
      </IconTile>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-ink truncate">
          {task.title}
        </p>
        <p className="text-[12px] text-muted truncate">
          {task.vehicle} · {task.claimRef}
        </p>
      </div>
      {task.due ? (
        <Chip tone="warn" size="sm">
          due {task.due}
        </Chip>
      ) : (
        <ChevronRight size={16} className="text-subtle shrink-0" />
      )}
    </Link>
  );
}
