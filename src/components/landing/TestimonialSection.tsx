import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Testimonial {
  name: string;
  title: string;
  description: string;
  avatarUrl: string;
}
export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      name: 'Ralf Boltshauser',
      title: 'CEO, Company Name',
      description:
        "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to work with you. It's really great how easy your websites are to update and manage. I never have any problem at all.",
      avatarUrl: '/images/landing/avatar.jpeg',
    },
  ];
  return (
    <div className="mx-5 md:mx-auto md:mt-16 md:max-w-4xl">
      <h3 className="text-lg text-primary">Testimonials</h3>
      <h2 className="text-4xl font-bold">What our customers say</h2>
      <div className="my-5 flex flex-col items-stretch justify-center gap-4 ">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="mx-auto flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 p-8 text-center md:max-w-[600px]"
          >
            <p>&quot;{testimonial.description}&quot;</p>
            <div className="mt-5 flex items-center justify-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={testimonial.avatarUrl}
                  className="h-16 w-16"
                />
                <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
              </Avatar>
              <div className=" text-start">
                <h3 className="">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {testimonial.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
