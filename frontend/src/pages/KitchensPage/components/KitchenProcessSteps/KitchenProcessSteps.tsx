import { useMemo } from 'react';
import { ScrollStoryCard, type ScrollStoryItem } from '../../../../components/sections';

export interface ProcessStep {
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
    summary:
      'In-depth consultation to map spatial dimensions, culinary routines, and design expectations.',
    detail:
      'Our kitchen architects analyze your floor plan, family cooking habits, appliance specifications, and storage priorities to establish a bespoke project brief.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749947/22_1_k8d7k9.png',
    imageAlt: 'Consultation and requirement discussion for modular kitchen planning',
  },
  {
    stepNumber: '02',
    title: 'Site Measurement & Kitchen Planning',
    summary:
      'Precision laser site measurement and ergonomic spatial planning to optimize your cooking triangle.',
    detail:
      'Site engineers verify structural plumb, plumbing conduits, electrical points, and gas routing to create a millimeter-accurate spatial matrix.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749954/22_2_tlwovf.png',
    imageAlt: 'Site measurement and kitchen planning inspection',
  },
  {
    stepNumber: '03',
    title: 'Design Presentation & Material Selection',
    summary:
      'Photorealistic 3D architectural elevations paired with physical material curation.',
    detail:
      'Review 3D realistic visualizations while physically curating core substrates, acrylic finishes, quartz countertops, and kinematic hardware fittings.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792750000/22_3_m6a0io.png',
    imageAlt: 'Design presentation and material selection with 3D elevations',
  },
  {
    stepNumber: '04',
    title: 'Quotation Approval & Advance Payment',
    summary:
      'Transparent, itemized pricing with zero hidden charges and clear milestone commitments.',
    detail:
      'Receive complete transparent documentation detailing box areas, door panel specifications, hardware allocations, and factory fabrication timelines.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792750001/22_4_blamfq.png',
    imageAlt: 'Quotation approval and advance payment confirmation',
  },
  {
    stepNumber: '05',
    title: 'Manufacturing & Quality Processing',
    summary:
      'High-precision factory fabrication with automated CNC routing and PUR waterproof sealing.',
    detail:
      'Computer-controlled cutting, multi-axis drilling, and reactive hot-melt PUR edge banding create hermetically sealed, long-lasting kitchen carcasses.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749959/22_5_rwotzv.png',
    imageAlt: 'Manufacturing and quality processing in specialized factory',
  },
  {
    stepNumber: '06',
    title: 'Installation & Final Handover',
    summary:
      'White-glove on-site assembly by certified technicians, hardware alignment, and final walkthrough.',
    detail:
      'Certified technicians assemble modules, calibrate soft-close drawer tracks, adjust hinge alignments, and conduct a thorough quality inspection.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749958/22_6_lsdztl.png',
    imageAlt: 'Installation and final handover of modular kitchen',
  },
];

export default function KitchenProcessSteps() {
  const storyItems = useMemo<ScrollStoryItem[]>(
    () =>
      KITCHEN_PROCESS_STEPS.map((step) => ({
        id: step.stepNumber,
        stepNumber: step.stepNumber,
        badge: `STEP ${step.stepNumber} OF 06`,
        title: step.title,
        description: step.summary,
        detail: step.detail,
        image: step.image,
        imageAlt: step.imageAlt,
        imageFit: 'contain',
      })),
    []
  );

  return (
    <ScrollStoryCard
      id="steps"
      eyebrow="OUR END-TO-END PROCESS"
      headline="Steps to Your Dream Kitchen"
      supportingCopy="A disciplined, six-stage architectural methodology ensuring millimeter precision, transparent commercials, and white-glove handover."
      items={storyItems}
    />
  );
}
