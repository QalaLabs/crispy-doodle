interface StepIndicatorProps {
  current: number
  total: number
}

export default function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            i < current ? 'bg-brand-500' : i === current - 1 ? 'bg-brand-400' : 'bg-stone-100'
          }`}
        />
      ))}
    </div>
  )
}
