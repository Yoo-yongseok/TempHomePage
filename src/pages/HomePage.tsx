import { BrandStrip } from '../features/home/BrandStrip'
import { CaseGallery } from '../features/home/CaseGallery'
import { Hero } from '../features/home/Hero'
import { Solution } from '../features/home/Solution'
import { BenefitsSection } from '../features/landing/BenefitsSection'
import { CoachSection } from '../features/landing/CoachSection'
import { CompareSection } from '../features/landing/CompareSection'
import { ConeSolutionSection } from '../features/landing/ConeSolutionSection'
import { CurriculumSection } from '../features/landing/CurriculumSection'
import { EduHistorySection } from '../features/landing/EduHistorySection'
import { FaqSection } from '../features/landing/FaqSection'
import { FinalCtaSection } from '../features/landing/FinalCtaSection'
import { FloatingCta } from '../features/landing/FloatingCta'
import { HowToJoinSection } from '../features/landing/HowToJoinSection'
import { IntroQuoteSection } from '../features/landing/IntroQuoteSection'
import { MethodSection } from '../features/landing/MethodSection'
import { NewsSection } from '../features/landing/NewsSection'
import { PlatformSection } from '../features/landing/PlatformSection'
import { PricingSection } from '../features/landing/PricingSection'
import { ProblemSection } from '../features/landing/ProblemSection'
import { ReviewsSection } from '../features/landing/ReviewsSection'
import { ValueSection } from '../features/landing/ValueSection'
import { WhoSection } from '../features/landing/WhoSection'

export function HomePage() {
  return (
    <div className="flex w-full flex-col bg-white">
      {/* 상단: 1번 사이트 UI */}
      <Hero />
      <BrandStrip />
      <CaseGallery />
      <Solution />

      {/* 하단: 2번 사이트 UI */}
      <ProblemSection />
      <ConeSolutionSection />
      <WhoSection />
      <IntroQuoteSection />
      <EduHistorySection />
      <MethodSection />
      <BenefitsSection />
      <PlatformSection />
      <CurriculumSection />
      <ValueSection />
      <CoachSection />
      <CompareSection />
      <ReviewsSection />
      <NewsSection />
      <PricingSection />
      <HowToJoinSection />
      <FinalCtaSection />
      <FaqSection />

      <FloatingCta />
    </div>
  )
}
