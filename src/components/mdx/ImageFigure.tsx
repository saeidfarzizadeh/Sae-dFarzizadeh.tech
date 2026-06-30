import Image from "next/image";

type ImageFigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export function ImageFigure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
}: ImageFigureProps) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
