import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { buildCloudinaryUrl, buildCloudinarySrcSet } from '../../../../lib/cloudinary';
import './KitchenProcessSteps.css';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  stepNumber: string;
  title: string;
  summary: string;
  detail: string;
  image: string;
  imageAlt: string;
}

const KITCHEN_PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Consultation & Requirement Discussion',
    summary: 'In-depth consultation to map spatial dimensions, culinary routines, and design expectations.',
    detail: 'Our kitchen architects analyze your floor plan, family cooking habits, appliance specifications, and storage priorities to establish a bespoke project brief.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749947/22_1_k8d7k9.png',
    imageAlt: 'Consultation and requirement discussion for modular kitchen planning',
  },
  {
    stepNumber: '02',
    title: 'Site Measurement & Kitchen Planning',
    summary: 'Precision laser site measurement and ergonomic spatial planning to optimize your cooking triangle.',
    detail: 'Site engineers verify structural plumb, plumbing conduits, electrical points, and gas routing to create a millimeter-accurate spatial matrix.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749954/22_2_tlwovf.png',
    imageAlt: 'Site measurement and kitchen planning inspection',
  },
  {
    stepNumber: '03',
    title: 'Design Presentation & Material Selection',
    summary: 'Photorealistic 3D architectural elevations paired with physical material curation.',
    detail: 'Review 3D realistic visualizations while physically curating core substrates, acrylic finishes, quartz countertops, and kinematic hardware fittings.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792750000/22_3_m6a0io.png',
    imageAlt: 'Design presentation and material selection with 3D elevations',
  },
  {
    stepNumber: '04',
    title: 'Quotation Approval & Advance Payment',
    summary: 'Transparent, itemized pricing with zero hidden charges and clear milestone commitments.',
    detail: 'Receive complete transparent documentation detailing box areas, door panel specifications, hardware allocations, and factory fabrication timelines.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792750001/22_4_blamfq.png',
    imageAlt: 'Quotation approval and advance payment confirmation',
  },
  {
    stepNumber: '05',
    title: 'Manufacturing & Quality Processing',
    summary: 'High-precision factory fabrication with automated CNC routing and PUR waterproof sealing.',
    detail: 'Computer-controlled cutting, multi-axis drilling, and reactive hot-melt PUR edge banding create hermetically sealed, long-lasting kitchen carcasses.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749959/22_5_rwotzv.png',
    imageAlt: 'Manufacturing and quality processing in specialized factory',
  },
  {
    stepNumber: '06',
    title: 'Installation & Final Handover',
    summary: 'White-glove on-site assembly by certified technicians, hardware alignment, and final walkthrough.',
    detail: 'Certified technicians assemble modules, calibrate soft-close drawer tracks, adjust hinge alignments, and conduct a thorough quality inspection.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749958/22_6_lsdztl.png',
    imageAlt: 'Installation and final handover of modular kitchen',
  },
];

export default function KitchenProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (!containerRef.current || !pinnedRef.current) return;

    const totalSteps = KITCHEN_PROCESS_STEPS.length;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP (>= 1024px): Pinned Scroll-Driven Storytelling Sequence
      mm.add('(min-width: 1024px)', () => {
        const trigger = containerRef.current;
        const pinned = pinnedRef.current;
        if (!trigger || !pinned) return;

        // Set initial visibility
        KITCHEN_PROCESS_STEPS.forEach((_, idx) => {
          gsap.set(`.k-step-img-${idx}`, {
            autoAlpha: idx === 0 ? 1 : 0,
            scale: idx === 0 ? 1 : 1.05,
          });
          gsap.set(`.k-step-text-${idx}`, {
            autoAlpha: idx === 0 ? 1 : 0,
            y: idx === 0 ? 0 : 20,
            pointerEvents: idx === 0 ? 'auto' : 'none',
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: 'top top+=72',
            end: () => `+=${(totalSteps - 1) * 100}%`,
            pin: pinned,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const newIdx = Math.min(
                totalSteps - 1,
                Math.floor(progress * totalSteps)
              );
              setActiveStepIndex(newIdx);
            },
          },
        });
        timelineRef.current = tl;

        // Sequence crossfades between consecutive steps
        for (let i = 0; i < totalSteps - 1; i++) {
          const startTime = i * 1.0;

          // Outgoing
          tl.to(
            `.k-step-img-${i}`,
            { autoAlpha: 0, scale: 0.98, duration: 0.6, ease: 'power2.inOut' },
            startTime + 0.4
          ).to(
            `.k-step-text-${i}`,
            { autoAlpha: 0, y: -16, duration: 0.5, ease: 'power2.in', pointerEvents: 'none' },
            startTime + 0.4
          );

          // Incoming
          tl.fromTo(
            `.k-step-img-${i + 1}`,
            { autoAlpha: 0, scale: 1.06 },
            { autoAlpha: 1, scale: 1.0, duration: 0.7, ease: 'power2.out' },
            startTime + 0.55
          ).fromTo(
            `.k-step-text-${i + 1}`,
            { autoAlpha: 0, y: 16, pointerEvents: 'none' },
            { autoAlpha: 1, y: 0, pointerEvents: 'auto', duration: 0.6, ease: 'power2.out' },
            startTime + 0.65
          );
        }

        // Hold final scene
        tl.to({}, { duration: 0.5 });
      });
    }, containerRef);

    return () => {
      timelineRef.current = null;
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  return (
    <section
      id="steps"
      ref={containerRef}
      className="kitchen-steps-section"
      aria-labelledby="kitchen-steps-title"
    >
      <div ref={pinnedRef} className="kitchen-steps-pinned">
        <div className="container--wide">
          {/* Section Header */}
          <div className="kitchen-steps-header">
            <span className="kitchen-steps-eyebrow">OUR END-TO-END PROCESS</span>
            <h2 id="kitchen-steps-title" className="kitchen-steps-title">
              Steps to Your Dream Kitchen
            </h2>
            <p className="kitchen-steps-desc">
              A disciplined, six-stage architectural methodology ensuring millimeter precision, transparent commercials, and white-glove handover.
            </p>
          </div>

          {/* Desktop Dual-Column Presentation Frame */}
          <div className="kitchen-steps-display">
            {/* Left Column: Active Step Editorial Narrative */}
            <div className="kitchen-steps-narrative">
              <div className="kitchen-steps-progress-pill">
                <span>STEP {KITCHEN_PROCESS_STEPS[activeStepIndex].stepNumber} OF 06</span>
              </div>

              {/* Stacked Text Layers for GSAP Crossfade */}
              <div className="kitchen-steps-text-container">
                {KITCHEN_PROCESS_STEPS.map((step, idx) => (
                  <div
                    key={step.stepNumber}
                    className={`k-step-text-${idx} kitchen-steps-text-layer ${
                      activeStepIndex === idx ? 'is-current' : ''
                    }`}
                  >
                    <h3 className="kitchen-steps-text__title">{step.title}</h3>
                    <p className="kitchen-steps-text__detail">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Architectural Process Visuals */}
            <div className="kitchen-steps-gallery">
              <div className="kitchen-steps-gallery__frame">
                {KITCHEN_PROCESS_STEPS.map((step, idx) => (
                  <div
                    key={step.stepNumber}
                    className={`k-step-img-${idx} kitchen-steps-img-layer ${
                      activeStepIndex === idx ? 'is-current' : ''
                    }`}
                  >
                    <img
                      src={buildCloudinaryUrl(step.image, { width: 800, quality: 'auto', format: 'auto' })}
                      srcSet={buildCloudinarySrcSet(step.image, [400, 600, 800]) || undefined}
                      sizes="(max-width: 860px) 100vw, 480px"
                      alt={step.imageAlt}
                      className="kitchen-steps-img"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      width={520}
                      height={420}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
