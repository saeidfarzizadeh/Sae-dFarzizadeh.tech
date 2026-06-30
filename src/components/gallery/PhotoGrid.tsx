import Image from "next/image";
import { cn } from "@/lib/utils";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type PhotoGridProps = {
  images: GalleryImage[];
  columns?: 1 | 2 | 3;
};

const columnStyles = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export function PhotoGrid({ images, columns = 3 }: PhotoGridProps) {
  return (
    <div className={cn("grid gap-4", columnStyles[columns])}>
      {images.map((image) => (
        <figure key={image.src} className="group overflow-hidden rounded-xl">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          {image.caption ? (
            <figcaption className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
