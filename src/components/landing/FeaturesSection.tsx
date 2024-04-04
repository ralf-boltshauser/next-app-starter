'use client';
import { Card } from '@/components/ui/card';
import { BookmarkIcon, HomeIcon, SunIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Feature {
  name: string;
  description: string;
  icon: React.FC<{ className: string }>;
  color: string;
  imageUrl: string;
}

export default function FeaturesSection() {
  const [selectedFeatureId, setSelectedFeatureId] = useState(0);

  const features: Feature[] = [
    {
      name: 'Feature 1',
      description: 'Description 1',
      icon: ({ className }) => <BookmarkIcon className={className} />,
      color: 'red',
      imageUrl: '/images/landing/hero_section.png',
    },
    {
      name: 'Feature 2',
      description: 'Description 2',
      icon: ({ className }) => <HomeIcon className={className} />,
      color: 'green',
      imageUrl: '/images/landing/feature_section.png',
    },
    {
      name: 'Feature 3',
      description: 'Description 3',
      icon: ({ className }) => <SunIcon className={className} />,
      color: 'blue',
      imageUrl: '/images/landing/pricing_section.png',
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedFeatureId((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length, selectedFeatureId]);

  return (
    <div className="mx-5 md:mx-auto md:mt-16 md:max-w-4xl">
      <h3 className="text-lg text-primary">Features</h3>
      <h2 className="text-4xl font-bold">
        Discover our amazing features
        <br /> and how they can help you
      </h2>
      <div className="my-5 flex flex-col items-stretch justify-start gap-4 md:flex-row md:items-stretch md:justify-center">
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            className={`flex w-full flex-col gap-2 rounded-xl border-2 p-5 text-start md:w-[250px] ${index == selectedFeatureId ? ' border-gray-100' : 'border-gray-100 bg-gray-100'}`}
            onHoverStart={() => setSelectedFeatureId(index)}
          >
            {
              <feature.icon
                className={`bg-${feature.color}-300 text-${feature.color}-800 h-10 w-10 rounded-lg p-2`}
              />
            }
            <div>
              <h3 className="text-xl font-bold">{feature.name}</h3>
              <p>{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <Card className={`aspect-video w-full overflow-hidden`}>
        <Image
          className="rounded-xl"
          src={features[selectedFeatureId].imageUrl}
          alt={features[selectedFeatureId].name}
          width={1920}
          height={1080}
        />
      </Card>
    </div>
  );
}
