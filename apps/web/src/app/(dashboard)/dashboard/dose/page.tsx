import Topbar from '../../_components/Topbar'

export const metadata = { title: 'Daily Dose' }

export default function DosePage() {
  return (
    <>
      <Topbar title="Daily Dose" />
      <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto">
        <div className="bg-white border border-stone-100 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">🎧</div>
          <h2 className="text-lg font-semibold text-stone-800 mb-2">Coming soon</h2>
          <p className="text-sm text-stone-500">Daily Dose audio player is being built in Phase 4.</p>
        </div>
      </div>
    </>
  )
}
