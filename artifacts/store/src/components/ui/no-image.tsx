import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoImageProps {
  className?: string;
  /** Size of the icon in px (default 32) */
  iconSize?: number;
  label?: string;
}

/**
 * Professional "No Image Available" placeholder.
 * Use this whenever a product image fails to load or is absent.
 */
export function NoImage({ className, iconSize = 32, label = "No Image Available" }: NoImageProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center gap-1.5 bg-gray-50 text-gray-400",
        className,
      )}
    >
      <ImageOff style={{ width: iconSize, height: iconSize }} strokeWidth={1.5} />
      <span className="text-[10px] font-medium text-gray-400 text-center leading-tight px-2">
        {label}
      </span>
    </div>
  );
}
