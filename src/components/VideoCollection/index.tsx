'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Media, Video } from '@/payload-types'

interface VideoCollectionProps {
  videos: Video[]
}

const VideoCollection = ({ videos }: VideoCollectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [videoSrc, setVideoSrc] = useState('')

  // Default placeholder for missing thumbnails
  const placeholderImage = '/media/video-placeholder.jpg'

  const openModal = (src: string) => {
    if (!src) {
      console.error('Video source is missing')
      return
    }
    setVideoSrc(src)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setVideoSrc('')
  }

  return (
    <>
      {/* Video Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl mx-4 bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <video controls autoPlay className="w-full aspect-video">
              <source
                src={videoSrc}
                type={
                  videoSrc?.endsWith('.mp4')
                    ? 'video/mp4'
                    : videoSrc?.endsWith('.mov')
                      ? 'video/quicktime'
                      : videoSrc?.endsWith('.webm')
                        ? 'video/webm'
                        : 'video/mp4'
                }
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Meet the Merchants Video Series */}
      <section id="merchants" className="py-20 bg-white text-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Meet the Merchants</h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12">
            Hear why local business owners <span className="text-blue-600">💙</span> being part of
            Downtown Rapid City. Check out our Meet the Merchants video series to discover the
            stories and passion behind the businesses that make our downtown a must-visit
            destination.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {videos.length === 0 ? (
              <div className="col-span-3 text-center py-8">
                <p>No videos found.</p>
              </div>
            ) : (
              videos.map((video) => (
                <div key={video.id} className="rounded-lg overflow-hidden shadow-lg bg-white">
                  <div
                    className="relative aspect-video cursor-pointer group"
                    onClick={() => openModal((video.videoFile as Media)?.url||"")}
                  >
                    <Image
                      src={(video.thumbnail as Media)?.url || placeholderImage}
                      alt={video.title || 'Video thumbnail'}
                      width={720}
                      height={1280}
                      className="object-cover w-full"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    {video.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                        <h3 className="font-bold">{video.title}</h3>
                      </div>
                    )}
                  </div>
                  {video.description && (
                    <div className="p-4">
                      <p className="text-gray-700">{video.description}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default VideoCollection
