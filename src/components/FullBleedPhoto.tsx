import Image from "next/image";

export default function FullBleedPhoto() {
  return (
    // Desktop: 900px tall, image centred. Mobile: shorter, shift right to keep face/camera in frame.
    <div className="relative w-full h-[500px] md:h-[900px] overflow-hidden">
      <Image
        src="/divider-photo.png"
        alt=""
        fill
        className="object-cover object-[65%_center] md:object-center"
        sizes="100vw"
      />
    </div>
  );
}
