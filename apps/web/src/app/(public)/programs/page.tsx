"use client";

import React, { useState } from 'react';
import StateVisualization from "@/components/StateVisualization";
import ProgramTimeline from "@/components/ProgramTimeline";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wind,
  Flame,
  Waves,
  BrainCircuit,
  Sparkles,
  Zap,
  Heart,
  Moon,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PROGRAMS = [
  {
    id: 'unwind',
    title: "Unwind & Rewind",
    tagline: "Systemic Burnout Recovery",
    duration: "21 Days",
    problem: "Chronic cortisol elevation leading to neural fatigue, decision paralysis, and sympathetic nervous system dominance.",
    process: "A synthesis of Solfeggio sound therapy to down-regulate the amygdala, combined with Vata-balancing Dinacharya rituals to ground the energetic body.",
    outcome: "Restored parasympathetic tone, enhanced cognitive bandwidth, and a recalibrated stress-response threshold.",
    color: "bg-blue-600",
    accent: "text-blue-600",
    steps: [
      { day: "Day 1-7", title: "Neural Decompression", neurological: "Inhibition of cortisol production; alpha-wave entrainment.", emotional: "Shift from panic to observant stillness.", icon: Wind },
      { day: "Day 8-14", title: "Systemic Grounding", neurological: "Vagus nerve stimulation; improved heart rate variability.", emotional: "Emergence of internal safety and stability.", icon: Zap },
      { day: "Day 15-21", title: "Cognitive Rewiring", neurological: "Prefrontal cortex reactivation; enhanced neuroplasticity.", emotional: "Proactive clarity and creative vitality.", icon: Sparkles }
    ],
    before: {
      label: "The Burnout State",
      description: "Fragmented focus, shallow breathing, and constant 'on-edge' sensation.",
      metrics: [{ label: "Cortisol", value: "High" }, { label: "Sleep Quality", value: "2/10" }]
    },
    after: {
      label: "The Synchronized State",
      description: "Deep presence, rhythmic vitality, and cognitive resilience.",
      metrics: [{ label: "HRV", value: "+45%" }, { label: "Focus", value: "9/10" }]
    }
  },
  {
    id: 'quit-smoking',
    title: "Quit Smoking",
    tagline: "Neural Pathway Decoupling",
    duration: "30 Days",
    problem: "Dopamine loop dependency reinforced by oral fixation and subconscious 'stress-relief' associations.",
    process: "Subconscious hypnosis to rewrite the identity of a 'smoker' paired with Agni-stimulating herbs to accelerate cellular detoxification.",
    outcome: "Complete cessation of cravings and a fundamental shift in self-identity and lung vitality.",
    color: "bg-rose-600",
    accent: "text-rose-600",
    steps: [
      { day: "Day 1-5", title: "The Decoupling", neurological: "Breaking the immediate dopamine-trigger association.", emotional: "Intense restlessness meeting new coping tools.", icon: Flame },
      { day: "Day 6-15", title: "Identity Shift", neurological: "Subconscious acceptance of a non-smoker identity.", emotional: "Emergence of pride and sensory awakening.", icon: BrainCircuit },
      { day: "Day 16-30", title: "Cellular Renewal", neurological: "Stabilized neurotransmitter levels; reduced inflammation.", emotional: "Freedom from dependency; profound empowerment.", icon: ShieldCheck }
    ],
    before: {
      label: "The Dependency",
      description: "Slave to the 2-hour craving cycle; diminished lung capacity.",
      metrics: [{ label: "Dopamine", value: "Erratic" }, { label: "Vitality", value: "Low" }]
    },
    after: {
      label: "The Sovereignty",
      description: "Total freedom from cravings; restored respiratory depth.",
      metrics: [{ label: "Cravings", value: "Zero" }, { label: "Oxygen", value: "+30%" }]
    }
  },
  {
    id: 'breakup',
    title: "Get Over a Breakup",
    tagline: "Emotional Sovereignty Protocol",
    duration: "14 Days",
    problem: "Heart-center blockage, obsessive thought loops, and a fragmented sense of self-worth following attachment loss.",
    process: "CBT-based cognitive re-architecture to dismantle 'loss' narratives, integrated with heart-chakra vibrational healing.",
    outcome: "Dissolution of obsessive loops, emotional closure, and a reclaimed, empowered individual identity.",
    color: "bg-indigo-600",
    accent: "text-indigo-600",
    steps: [
      { day: "Day 1-4", title: "Narrative Audit", neurological: "Interrupting the rumination circuits in the brain.", emotional: "Moving from acute grief to analytical distance.", icon: Heart },
      { day: "Day 5-10", title: "Somatic Release", neurological: "Clearing the 'heart-break' physical tension patterns.", emotional: "Release of resentment; emergence of self-love.", icon: Waves },
      { day: "Day 11-14", title: "The Rebirth", neurological: "Strengthening the self-referential neural networks.", emotional: "Excitement for the future; total closure.", icon: Sparkles }
    ],
    before: {
      label: "The Fragmentation",
      description: "Identity tied to the past; constant mental replay of loss.",
      metrics: [{ label: "Anxiety", value: "Peak" }, { label: "Self-Worth", value: "3/10" }]
    },
    after: {
      label: "The Sovereignty",
      description: "Whole and complete within oneself; past integrated as wisdom.",
      metrics: [{ label: "Closure", value: "100%" }, { label: "Joy", value: "8/10" }]
    }
  },
  {
    id: 'sleep',
    title: "Sleep Program",
    tagline: "Circadian Rhythm Architecture",
    duration: "10 Days",
    problem: "Chronic insomnia driven by blue-light toxicity, spatial Vastu discord, and an overactive 'monkey mind'.",
    process: "Spatial alignment of the sleeping sanctuary (Vastu) combined with melatonin-inducing pranayama protocols.",
    outcome: "Consistent entry into deep REM cycles and a natural, effortless wake-up vitality.",
    color: "bg-purple-600",
    accent: "text-purple-600",
    steps: [
      { day: "Day 1-3", title: "Sanctuary Alignment", neurological: "Reducing environmental hyper-vigilance.", emotional: "Immediate sense of safety in the bedroom.", icon: Moon },
      { day: "Day 4-7", title: "Rhythm Reset", neurological: "Resynchronizing the suprachiasmatic nucleus.", emotional: "Reduction in evening anxiety and dread.", icon: Timer },
      { day: "Day 8-10", title: "Deep Integration", neurological: "Optimized GABA production; sustained REM cycles.", emotional: "Morning clarity and sustained daily energy.", icon: Zap }
    ],
    before: {
      label: "The Exhaustion",
      description: "Tired but wired; dependent on stimulants to function.",
      metrics: [{ label: "REM Sleep", value: "Minimal" }, { label: "Energy", value: "2/10" }]
    },
    after: {
      label: "The Vitality",
      description: "Natural sleep onset; waking up before the alarm with ease.",
      metrics: [{ label: "Sleep Score", value: "95+" }, { label: "Alertness", value: "High" }]
    }
  }
];

const Programs = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          <header className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]">
              <Sparkles className="w-3 h-3" /> Structured Transformations
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.1]">
              Bespoke <br />
              <span className="text-amber-600 italic">Evolution Protocols</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
              Our programs are time-bound, high-intensity journeys designed to solve specific
              systemic imbalances through a unified clinical and Vedic approach.
            </p>
          </header>

          <div className="space-y-8">
            {PROGRAMS.map((program) => {
              const isExpanded = expandedId === program.id;

              return (
                <div
                  key={program.id}
                  className={cn(
                    "rounded-[48px] border transition-all duration-700 overflow-hidden group",
                    isExpanded ? "bg-white shadow-2xl border-slate-200" : "bg-slate-50/50 border-transparent hover:bg-white hover:shadow-xl"
                  )}
                >
                  <div
                    className="p-8 md:p-12 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : program.id)}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white", program.color)}>
                            {program.duration}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{program.tagline}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">{program.title}</h3>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="hidden md:block text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Success Rate</p>
                          <p className="text-xl font-black text-slate-900">94%</p>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors"
                        >
                          <ChevronDown className="w-6 h-6" />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="pt-16 space-y-20">
                            {/* Problem/Process/Outcome */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500">The Problem</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">{program.problem}</p>
                              </div>
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">The Process</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">{program.process}</p>
                              </div>
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">The Outcome</h4>
                                <p className="text-sm text-slate-900 font-bold leading-relaxed">{program.outcome}</p>
                              </div>
                            </div>

                            {/* Before/After Visualization */}
                            <div className="space-y-8">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center">State Visualization</h4>
                              <StateVisualization before={program.before} after={program.after} />
                            </div>

                            {/* Timeline */}
                            <div className="space-y-12">
                              <div className="text-center space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Transformation Roadmap</h4>
                                <h3 className="text-2xl font-serif font-bold text-slate-900">Day 1 to Day {program.duration.split(' ')[0]}</h3>
                              </div>
                              <ProgramTimeline steps={program.steps} color={program.color} />
                            </div>

                            {/* CTA */}
                            <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-slate-900">Forensic Privacy Guaranteed</p>
                                  <p className="text-xs text-slate-500">All program data is hashed to your identity.</p>
                                </div>
                              </div>
                              <Button asChild className={cn("h-16 px-12 rounded-2xl text-white font-bold text-lg shadow-xl", program.color)}>
                                <Link href="/contact">Apply for Program <ArrowRight className="ml-2 w-5 h-5" /></Link>
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          <section className="bg-slate-900 rounded-[60px] p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <BrainCircuit className="w-64 h-64 text-blue-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Need a Custom Protocol?</h2>
            <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
              If your challenges fall outside these structured paths, we can architect a bespoke
              synthesis protocol tailored specifically to your unique system.
            </p>
            <Button asChild variant="outline" className="h-14 px-10 rounded-2xl border-white/20 text-white hover:bg-white/10 font-bold">
              <Link href="/contact">Request Bespoke Protocol</Link>
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Programs;
