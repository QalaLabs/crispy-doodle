import Topbar from '../../_components/Topbar'

export const metadata = { title: 'Progress' }

export default function ProgressPage() {
  return (
    <>
      <Topbar title="Progress" />
      <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto">
        <div className="bg-white border border-stone-100 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">📈</div>
          <h2 className="text-lg font-semibold text-stone-800 mb-2">Progress & achievements</h2>
          <p className="text-sm text-stone-500">Charts, streaks and badges are being built in Phase 5.</p>
        </div>
      </div>
    </>
  )
}
