import AnimatedHeading from './AnimatedHeading';

export default function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className='mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
      <div>
        <p className='label mb-4 font-semibold text-accent'>{eyebrow}</p>
        <AnimatedHeading className='text-[clamp(32px,4vw,56px)] font-semibold leading-[1.05] tracking-[-0.035em]'>
          {title}
        </AnimatedHeading>
      </div>

      {children}
    </div>
  )
}
