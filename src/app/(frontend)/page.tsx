import Image from "next/image";
import VideoCollection from "@/components/VideoCollection";
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteOption } from '@/payload-types'
import { unstable_cache } from 'next/cache'


const fetchVideos = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'videos',
      limit: 100,
      depth: 2, // To resolve relationships
      where: {
        category: {
          equals: 'meet-the-merchants',
        },
      },
    })

    return result.docs
  },
  ['videos'],
  {
    tags: ['videos'],
  },
)


export default async function Home() {

  const videos = await fetchVideos();
  const siteOptions: SiteOption = (await getCachedGlobal('siteOptions', 2)()) as SiteOption;

  return (
    <div className="min-h-screen font-display">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <Image
          src="/Drone-Images-2.jpg"
          alt="Downtown Rapid City"
          fill
          priority
          className="object-cover brightness-95"
        />
        <div className="relative z-10  mx-auto px-4 text-center text-white">
          <div className="flex justify-center mb-6">
            {typeof siteOptions.siteLogoLight !== 'number' && siteOptions.siteLogoLight ? (
              <Image
                src={siteOptions.siteLogoLight.url || ''}
                alt="Downtown Rapid City Logo"
                width={200}
                height={200}
                className="object-contain"
              />
            ) : typeof siteOptions.siteLogo !== 'number' && siteOptions.siteLogo ? (
              <Image
                src={siteOptions.siteLogo.url || ''}
                alt="Downtown Rapid City Logo"
                width={200}
                height={200}
                className="object-contain"
              />
            ) : null}
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ textShadow: '0 0 5px #000000' }}
          >
            I <span className="text-primary">💙</span> Downtown Rapid City
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8" style={{ textShadow: '0 0 5px #000000' }}>
            Celebrate the heart of Rapid City and the people who make it truly special.
          </h2>
          <div className="flex">
            <p className="max-w-2xl mx-auto text-lg w-full p-4 mb-12 rounded-lg shadow bg-[radial-gradient(circle_at_center,rgba(0,0,0,.4)_0%,rgba(0,0,0,0)_200%)]">
              Welcome to Downtown Rapid City — where downtown is more than just a place, it’s a
              vibrant community filled with unique businesses, welcoming faces, and countless
              reasons to love it. Whether you’re a local, a visitor, or a business owner, this
              campaign invites you to discover, share, and celebrate what makes our downtown so
              special. From charming boutiques and cozy coffee shops to delicious restaurants and
              unforgettable events, there’s something here for everyone. Join us in spotlighting the
              heart of Rapid City!{' '}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#merchants"
              className="bg-deep-blue hover:bg-secondary text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Meet the Merchants
            </a>
            <a
              href="#share"
              className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-6 rounded-full transition-colors"
            >
              Share the Love
            </a>
          </div>
        </div>
      </section>

      {/* Meet the Merchants Video Series */}
      <VideoCollection videos={videos} />

      {/* User Engagement & Community Participation */}
      <section id="share" className="py-20 bg-primary-blue/20 text-primary-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Share the Love</h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12">
            Love Downtown Rapid City? Join the fun by sharing your experiences and pride with our
            community!
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">How to Join the Fun:</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-primary mr-2">💙</span>
                <span>
                  <strong>Visit Downtown Businesses:</strong> Support your favorite local spots and
                  discover new gems!
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">💙</span>
                <span>
                  <strong>Share the Love:</strong> Post on social media using #IHeartDowntownRC and
                  let everyone know what makes our downtown unique.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">💙</span>
                <span>
                  <strong>Spot the Stickers:</strong> Look for &#34;I{' '}
                  <span className="text-primary">💙</span> Downtown Rapid City&#34; stickers and
                  banners around town—snap a photo and share your pride!
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">💙</span>
                <span>
                  <strong>Be a Part of the Story:</strong> Check out our &#34;Meet the
                  Merchants&#34; video series to hear why local business owners love being part of
                  downtown Rapid City.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">💙</span>
                <span>
                  <strong>Stay Tuned:</strong> Watch for more ways to share your love for downtown
                  Rapid City on our website and social media.
                </span>
              </li>
            </ul>
            <div className="text-center group">
              <div className="flex justify-center my-6">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/sticker.jpg"
                    alt="I Heart Downtown Rapid City Sticker"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <h2>Share the love on social media #IHeartDowntownRC</h2>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href="https://facebook.com"
                  className="p-3 bg-[#1877F2] text-white rounded-full hover:bg-opacity-80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  className="p-3 bg-[#1DA1F2] text-white rounded-full hover:bg-opacity-80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  className="p-3 bg-[#E4405F] text-white rounded-full hover:bg-opacity-80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Community Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image src="/IMG_5267.jpg" alt="Community Photo 1" fill className="object-cover" />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image src="/IMG_5334.jpg" alt="Community Photo 2" fill className="object-cover" />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image src="/IMG_6343.jpeg" alt="Community Photo 3" fill className="object-cover" />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image src="/IMG_6655.jpeg" alt="Community Photo 4" fill className="object-cover" />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image src="/IMG_8390.jpg" alt="Community Photo 5" fill className="object-cover" />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/IMG_8611-Enhanced-NR (1).jpg"
                  alt="Community Photo 6"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/Downtown-Fall-Images-18.jpg"
                  alt="Community Photo 7"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/Downtown-Fall-Images-19.jpg"
                  alt="Community Photo 8"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downtown Beat Newsletters */}
      <section className="py-20 bg-white text-gray-600">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Downtown Beat</h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12">
            Stay connected with the latest news, events, and highlights from the heart of Rapid
            City.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/Downtown-Fall-Images-16.jpg"
                  alt="Newsletter 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Spring 2025 Newsletter</h3>
                <p className="mb-4">
                  Discover upcoming events, new business openings, and seasonal highlights in
                  downtown Rapid City.
                </p>
                <a href="#" className="text-blue-600 font-bold hover:underline">
                  Read Newsletter →
                </a>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/Downtown-Fall-Images-20.jpg"
                  alt="Newsletter 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Winter 2024 Newsletter</h3>
                <p className="mb-4">
                  Look back at holiday celebrations and find out what&#39;s coming up in the new
                  year for downtown Rapid City.
                </p>
                <a href="#" className="text-blue-600 font-bold hover:underline">
                  Read Newsletter →
                </a>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/Sunset-Images-4.jpg"
                  alt="Newsletter 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Fall 2024 Newsletter</h3>
                <p className="mb-4">
                  Explore autumn activities, seasonal specials, and community events happening in
                  downtown Rapid City.
                </p>
                <a href="#" className="text-blue-600 font-bold hover:underline">
                  Read Newsletter →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                {typeof siteOptions.siteLogoLight !== 'number' && siteOptions.siteLogoLight ? (
                  <Image
                    src={siteOptions.siteLogoLight.url || ''}
                    alt="Downtown Rapid City Logo"
                    width={100}
                    height={100}
                    className="object-contain mx-3"
                  />
                ) : typeof siteOptions.siteLogo !== 'number' && siteOptions.siteLogo ? (
                  <Image
                    src={siteOptions.siteLogo.url || ''}
                    alt="Downtown Rapid City Logo"
                    width={100}
                    height={100}
                    className="object-contain mx-3"
                  />
                ) : null}
                <div>
                  <h2 className="text-2xl font-bold">
                    I <span className="text-blue-600">💙</span> Downtown Rapid City
                  </h2>
                  <p className="mt-2">
                    Celebrate the heart of our city and the people who make it truly special.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-400">
                Instagram
              </a>
              <a href="#" className="hover:text-blue-400">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-400">
                Contact Us
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Downtown Rapid City. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
