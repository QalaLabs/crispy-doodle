import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog-posts'
import { ArrowLeft, Clock, User, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Params { params: { slug: string } }

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Params) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Aumveda Insights`,
    description: post.excerpt,
    openGraph: { images: [post.image] },
  }
}

export default function BlogPostPage({ params }: Params) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter(p => p.slug !== post.slug && (p.category === post.category || p.author === post.author)).slice(0, 2)

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6 space-y-12">

          {/* Back */}
          <Link href="/insights" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm font-bold transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Insights
          </Link>

          {/* Header */}
          <header className="space-y-6">
            <div className="flex flex-wrap gap-3 items-center">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                post.type === 'blog' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                post.type === 'story' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                'bg-amber-50 text-amber-600 border-amber-100'
              }`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
              <span className="text-xs text-slate-400">{post.date}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">{post.excerpt}</p>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{post.author}</p>
                <p className="text-xs text-slate-400">{post.authorRole}</p>
              </div>
            </div>
          </header>

          {/* Hero image */}
          <div className="aspect-[16/9] rounded-[32px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Body */}
          <div
            className="prose prose-slate prose-lg max-w-none
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-slate-900 prose-strong:font-bold
              prose-em:text-slate-600"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* CTA */}
          <div className="p-10 bg-slate-900 rounded-[40px] text-center space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400">Ready to go deeper?</p>
            <h3 className="text-2xl font-serif font-bold text-white">
              Experience the Synthesis Firsthand
            </h3>
            <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
              Book a discovery call with Sejal or Archana Jain and begin your personalised transformation protocol.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="h-12 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold">
                <Link href="/contact">Book a Session</Link>
              </Button>
              <Button asChild variant="ghost" className="h-12 px-8 rounded-xl border border-white/10 text-slate-300 font-bold">
                <Link href="/tools">Try a Free Tool <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Related Insights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map(r => (
                  <Link key={r.slug} href={`/insights/${r.slug}`} className="group p-6 bg-slate-50 rounded-[24px] hover:bg-amber-50 transition-colors space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{r.category}</p>
                    <h4 className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">{r.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{r.excerpt}</p>
                    <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                      Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </article>
      </main>
    </div>
  )
}
