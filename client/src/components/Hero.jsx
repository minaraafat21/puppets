import { assets } from '../../public/assets/assets';

const callouts1 = [
  {
    name: 'Bestsellers',
    description: '',
    imageSrc: assets.hero,
    imageAlt:
      'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
];

const callouts2 = [
  {
    name: 'New Arrivals',
    description: '',
    imageSrc: assets.stitchHero,
    imageAlt:
      'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
];

export default function Hero() {
  return (
    <div className="bg-blue-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl  lg:max-w-none lg:py-10">
          <div className="mt-0 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
            {/* Left Side (callouts1) */}
            <div className="space-y-12 lg:space-y-0">
              {callouts1.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-100 sm:h-128 w-full overflow-hidden rounded-lg ">
                    <img
                      alt={callout.imageAlt}
                      src={callout.imageSrc}
                      className="h-full w-full object-cover object-center"
                    />
          
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side (callouts2) */}
            <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-6">
              {callouts2.map((callout) => (
                <div key={callout.name} className="group relative">
                <div className="relative h-100 sm:h-128 w-full overflow-hidden rounded-lg">
                    <img
                      alt={callout.imageAlt}
                      src={callout.imageSrc}
                      className="h-full w-full object-cover object-center"
                    />
                    
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
