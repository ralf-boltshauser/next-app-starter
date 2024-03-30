'use client';
import { motion } from 'framer-motion';

interface ProcessItem {
  title: string;
  description: string;
}
export default function HowItWorksSection() {
  const processes: ProcessItem[] = [
    {
      title: 'Step 1',
      description: 'Description 1',
    },
    {
      title: 'Step 2',
      description: 'Description 2',
    },
    {
      title: 'Step 3',
      description: 'Description 3',
    },
  ];
  return (
    <>
      <div className="mx-5 mt-5 md:mx-auto md:mt-16 md:max-w-4xl">
        <h3 className="text-lg text-primary">How it Works</h3>
        <h2 className="text-4xl font-bold">
          Discover our easy process
          <br /> and how you can use it
        </h2>
      </div>
      <div className="m-5 flex flex-col items-stretch justify-start gap-4 md:flex-row md:items-stretch md:justify-center">
        {processes.map((process, index) => (
          <motion.div
            key={process.title}
            className={`flex w-full flex-col justify-start gap-2 rounded-xl border-2 p-5 text-start md:w-[250px] md:min-w-[250px] `}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md border-2 p-2 text-lg text-muted-foreground">
              {index + 1}.
            </span>
            <div>
              <h3 className="text-xl font-bold">{process.title}</h3>
              <p>{process.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
