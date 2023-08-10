import { XMarkIcon } from '@heroicons/react/24/outline';
import { MotionConfig } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export interface ImageProps {
  id: number;
  height: string;
  width: string;
  public_id: string;
  format: string;
  blurDataUrl?: string;
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

export default function SharedModal({
  index,
  images,
  closeModal,
  navigation,
  currentPhoto,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  let currentImage = images ? images[index] : currentPhoto;

  return (
    <MotionConfig
    // transition={{
    //   x: { type: 'spring', stiffness: 300, damping: 30 },
    //   opacity: { duration: 0.2 },
    // }}
    >
      <div className="xl:taller-than-854:h-auto relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full">
        {/* Main image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <div className="absolute">
              <Image
                src={`https://res.cloudinary.com/${
                  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                }/image/upload/c_scale,${navigation ? 'w_1280' : 'w_1920'}/${
                  currentImage.public_id
                }.${currentImage.format}`}
                // src="https://i.imgur.com/rxhEz0S.gif"
                width={navigation ? 1280 : 1920}
                height={navigation ? 853 : 1280}
                priority
                alt="Next.js Conf image"
                onLoadingComplete={() => setLoaded(true)}
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {loaded && (
            <div className="relative aspect-[3/2] max-h-full w-full">
              <div className="absolute left-0 top-0 flex items-center gap-2 p-3 text-white">
                <button
                  onClick={() => closeModal()}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}
