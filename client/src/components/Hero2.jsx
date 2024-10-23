import { Navigate } from 'react-router-dom';
import { assets } from '../../public/assets/assets';

const callouts1 = [
  {
    name: 'Bestsellers',
    description: '',
    imageSrc: assets.gangstar2,
    imageAlt:
      'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '/shop/bestsellers',
  },
];

const callouts2 = [
  {
    name: 'New Arrivals',
    description: '',
    imageSrc: assets.spider1,
    imageAlt:
      'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '/shop/new-arrivals',
  },
  {
    name: 'Gifts',
    description: '',
    imageSrc: assets.stitch,
    imageAlt:
      'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
];

export default function Hero2() {
  return (
    <div className="bg-blue-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl  lg:max-w-none :py-32">
          <div className="mt-0 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
            {/* Left Side (callouts1) */}
            <div className="space-y-4 lg:space-y-0">
              {callouts1.map((callout) => (
                <div
                  key={callout.name}
                  className="group relative"
                  onClick={() => {
                    window.location.href = callout.href;
                  }}
                >
                  <div className="relative h-100 sm:h-128 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75">
                    <img
                      alt={callout.imageAlt}
                      src={callout.imageSrc}
                      className="h-full w-full object-cover object-center"
                    />
                    {/* Text Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                          {callout.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side (callouts2) */}
            <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-6">
              {callouts2.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div
                    className="relative h-96 sm:h-128 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75"
                    onClick={() => {
                      window.location.href = callout.href;
                    }}
                  >
                    <img
                      alt={callout.imageAlt}
                      src={callout.imageSrc}
                      className="h-full w-full object-cover object-center"
                    />
                    {/* Text Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                          {callout.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
