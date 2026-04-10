'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlayCircle, Clock, Star, Lock, CheckCircle2, BookOpen, ChevronRight } from 'lucide-react'
import CourseSidebar from '@/components/CourseSidebar'
import { showSuccess } from '@/utils/toast'
import Topbar from '../../_components/Topbar'

const COURSES = [
  {
    id: 'ayurveda-fundamentals',
    title: 'Ayurveda Fundamentals',
    subtitle: 'The Ancient Science of Life',
    instructor: 'Sejal Jain',
    duration: '4h 30m',
    lessons: 12,
    rating: 4.9,
    level: 'Beginner',
    enrolled: true,
    progress: 67,
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
    tag: 'Popular',
    modules: [
      { id: 'm1', title: 'Introduction to Ayurveda', duration: '18 min', level: 'Intro', completed: true },
      { id: 'm2', title: 'The Three Doshas', duration: '24 min', level: 'Core', completed: true },
      { id: 'm3', title: 'Understanding Vata', duration: '20 min', level: 'Core', completed: false },
      { id: 'm4', title: 'Understanding Pitta', duration: '22 min', level: 'Core', completed: false },
      { id: 'm5', title: 'Understanding Kapha', duration: '19 min', level: 'Core', completed: false },
    ],
  },
  {
    id: 'prakriti-discovery',
    title: 'Prakriti Discovery',
    subtitle: 'Know Your True Nature',
    instructor: 'Archana Jain',
    duration: '3h 15m',
    lessons: 8,
    rating: 4.8,
    level: 'Intermediate',
    enrolled: true,
    progress: 25,
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
    tag: 'New',
    modules: [
      { id: 'm1', title: 'What is Prakriti?', duration: '15 min', level: 'Intro', completed: true },
      { id: 'm2', title: 'Physical Constitution', duration: '28 min', level: 'Core', completed: false },
      { id: 'm3', title: 'Mental & Emotional Type', duration: '25 min', level: 'Core', completed: false },
      { id: 'm4', title: 'Diet for Your Prakriti', duration: '30 min', level: 'Applied', completed: false },
    ],
  },
  {
    id: 'dinacharya-mastery',
    title: 'Dinacharya Mastery',
    subtitle: 'The Art of Daily Routine',
    instructor: 'Sejal Jain',
    duration: '2h 45m',
    lessons: 7,
    rating: 4.7,
    level: 'All Levels',
    enrolled: false,
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=600',
    modules: [],
  },
  {
    id: 'healing-herbs',
    title: 'Healing Herbs & Rasayanas',
    subtitle: 'Ayurvedic Pharmacopoeia',
    instructor: 'Archana Jain',
    duration: '5h 10m',
    lessons: 15,
    rating: 4.9,
    level: 'Advanced',
    enrolled: false,
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=600',
    tag: 'Premium',
    modules: [],
  },
]

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0])
  const [activeModuleId, setActiveModuleId] = useState(COURSES[0].modules[0]?.id ?? '')
  const [view, setView] = useState<'grid' | 'player'>('grid')

  const handleEnroll = (courseTitle: string) => {
    showSuccess(`Enrolled in ${courseTitle}!`)
  }

  const handleModuleSelect = (id: string) => {
    setActiveModuleId(id)
  }

  const openPlayer = (course: typeof COURSES[0]) => {
    setSelectedCourse(course)
    setActiveModuleId(course.modules[0]?.id ?? '')
    setView('player')
  }

  if (view === 'player' && selectedCourse.enrolled) {
    const activeModule = selectedCourse.modules.find(m => m.id === activeModuleId)
    const completedCount = selectedCourse.modules.filter(m => m.completed).length

    return (
      <>
        <Topbar title={selectedCourse.title} />
        <div className="flex h-[calc(100vh-64px)]">
          {/* Video Area */}
          <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto backdrop-blur-sm">
                  <PlayCircle className="w-10 h-10 text-white" />
                </div>
                <p className="text-white/60 text-sm">Video content loads from R2 in production</p>
              </div>
              {/* Watermark */}
              <div className="absolute inset-0 pointer-events-none select-none opacity-[0.04] flex items-center justify-center text-white text-xs font-mono rotate-[-15deg] text-center leading-[3rem]">
                aumveda-user aumveda-user aumveda-user aumveda-user aumveda-user<br />
                aumveda-user aumveda-user aumveda-user aumveda-user aumveda-user
              </div>
            </div>

            <div className="p-8 bg-slate-900 flex-1">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
                  <BookOpen className="w-4 h-4" />
                  {selectedCourse.title}
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{activeModule?.title}</h2>
                <div className="flex items-center gap-4 text-slate-400 text-sm mb-6">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{activeModule?.duration}</span>
                  <Badge variant="secondary" className="bg-slate-800 text-slate-400 border-none">{activeModule?.level}</Badge>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  This module covers the essential principles of {activeModule?.title.toLowerCase()},
                  drawing from ancient Ayurvedic texts and modern clinical research. You will learn
                  practical applications that can be integrated into your daily wellness practice.
                </p>
                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={() => { showSuccess('Module marked complete!'); setView('grid') }}
                    className="bg-primary hover:bg-primary/90 rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark Complete & Continue
                  </Button>
                  <Button variant="outline" onClick={() => setView('grid')} className="rounded-xl border-slate-700 text-slate-400 hover:bg-slate-800">
                    Back to Courses
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 hidden lg:block shrink-0">
            <CourseSidebar
              modules={selectedCourse.modules}
              activeModuleId={activeModuleId}
              onModuleSelect={handleModuleSelect}
              courseTitle={selectedCourse.title}
              overallProgress={Math.round((completedCount / selectedCourse.modules.length) * 100)}
            />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Topbar title="My Courses" />
      <div className="px-4 lg:px-8 py-6 max-w-6xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <p className="text-slate-500 font-medium">Your Ayurvedic learning journey, curated for your Prakriti.</p>
          <Badge className="bg-primary/10 text-primary border-none font-bold">
            {COURSES.filter(c => c.enrolled).length} enrolled
          </Badge>
        </div>

        {/* In-progress courses */}
        {COURSES.some(c => c.enrolled && c.progress > 0) && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-primary" />
              Continue Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURSES.filter(c => c.enrolled && c.progress > 0).map(course => (
                <Card key={course.id} className="border-none shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="h-1.5 bg-white/20 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-primary transition-all" style={{ width: `${course.progress}%` }} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70 text-xs font-bold">{course.progress}% complete</span>
                        <span className="text-white/70 text-xs">{course.lessons} lessons</span>
                      </div>
                    </div>
                    {course.tag && (
                      <Badge className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white border-none text-[10px] font-bold uppercase tracking-widest">
                        {course.tag}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{course.instructor}</p>
                    <h3 className="font-bold text-slate-900 mb-1">{course.title}</h3>
                    <p className="text-xs text-slate-500 mb-4">{course.subtitle}</p>
                    <Button onClick={() => openPlayer(course)} className="w-full bg-slate-900 hover:bg-black rounded-xl h-10">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Continue Course
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All courses */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            All Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map(course => (
              <Card key={course.id} className="border-none shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="aspect-video relative overflow-hidden bg-slate-100">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {!course.enrolled && (
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-white/60" />
                    </div>
                  )}
                  {course.tag && (
                    <Badge className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white border-none text-[10px] font-bold uppercase tracking-widest">
                      {course.tag}
                    </Badge>
                  )}
                  {course.enrolled && (
                    <Badge className="absolute top-3 right-3 bg-emerald-500 text-white border-none text-[10px] font-bold">
                      Enrolled
                    </Badge>
                  )}
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{course.level}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-slate-700">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{course.title}</h3>
                  <p className="text-xs text-slate-500 mb-3 flex-1">{course.subtitle}</p>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span>{course.lessons} lessons</span>
                  </div>
                  {course.enrolled ? (
                    <Button size="sm" onClick={() => openPlayer(course)} className="w-full bg-slate-900 hover:bg-black rounded-lg h-9">
                      <PlayCircle className="w-3.5 h-3.5 mr-1.5" />
                      {course.progress > 0 ? 'Continue' : 'Start'}
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => handleEnroll(course.title)} variant="outline" className="w-full rounded-lg h-9 border-slate-200 hover:bg-slate-50">
                      <ChevronRight className="w-3.5 h-3.5 mr-1.5" />
                      Enroll Free
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
