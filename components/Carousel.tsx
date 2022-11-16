import React, {useState} from 'react'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline'
import Image from 'next/image'
import {AnimatePresence, motion, MotionConfig} from 'framer-motion'

let images = [
  "/images/image-1.jpeg",
  "/images/image-2.jpeg",
  "/images/image-3.jpeg",
  "/images/image-4.jpeg",
  "/images/image-5.jpeg",
  "/images/image-6.jpeg",
]

let collapsedAspectRatio = 1/3
let fullAspectRatio = 3/2

const Carousel = () => {

  let [index, setIndex] = useState(0)

  return (
    <MotionConfig transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-screen bg-bglack">
        <div className="mx-auto flex h-[80vh] max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
              {images.map((image) => (
                <Image
                  key={image}
                  src={image}
                  alt="Image"
                  width={1920}
                  height={1280}
                  className="aspect-video object-cover w-full h-full"
                />
              ))}
            </motion.div>
            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  animate={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  animate={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex h-14 absolute justify-center inset-x-0 bottom-6 overflow-hidden">
            <motion.div
              animate={{
                x: `-${
                  index * 100 * (collapsedAspectRatio / fullAspectRatio)
                }%`,
              }}
              style={{aspectRatio: fullAspectRatio}}
              className="flex"
            >
              {images.map((image, i) => (
                <button
                  key={image}
                  onClick={() => setIndex(i)}
                  style={{
                    aspectRatio:
                      i === index ? fullAspectRatio : collapsedAspectRatio,
                  }}
                  className={`shrink-0`}
                >
                  <Image
                    src={image}
                    alt="Image"
                    width={1920}
                    height={1280}
                    className="h-full object-cover"
                  />
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

export default Carousel
