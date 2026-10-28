import { ClientStrip } from '../features/home/ClientStrip'
import { Hero } from '../features/home/Hero'
import { Solution } from '../features/home/Solution'
import { CoachSection } from '../features/landing/CoachSection'
import { CompareSection } from '../features/landing/CompareSection'
import { CurriculumSection } from '../features/landing/CurriculumSection'
import { FaqSection } from '../features/landing/FaqSection'
import { FeaturedCasesSection } from '../features/landing/FeaturedCasesSection'
import { FinalCtaSection } from '../features/landing/FinalCtaSection'
import { FloatingCta } from '../features/landing/FloatingCta'
import { IntroQuoteSection } from '../features/landing/IntroQuoteSection'
import { MethodSection } from '../features/landing/MethodSection'
import { NewsSection } from '../features/landing/NewsSection'
import { ProgramsSection } from '../features/landing/ProgramsSection'
import { ServiceTracksSection } from '../features/landing/ServiceTracksSection'
import { WhoSection } from '../features/landing/WhoSection'

// B2B 구매 흐름: 신뢰(고객사) → 문제(일반 교육과 비교) → 무엇을(서비스 소개 스크롤 탭 → 서비스별 레퍼런스)
// → 증명(대표 사례·인용·강점) → 어떻게(프로세스·대상·교육 형태) → 누가(전문가) → 전환(FAQ·문의 폼)
export function HomePage() {
  return (
    <div className="flex w-full flex-col bg-white">
      <Hero />
      <ClientStrip />

      <CompareSection />
      <Solution />
      <ServiceTracksSection />
      <FeaturedCasesSection />
      <IntroQuoteSection />
      <MethodSection />

      <CurriculumSection />
      <WhoSection />
      <ProgramsSection />
      <CoachSection />

      <NewsSection />
      <FaqSection />
      <FinalCtaSection />

      <FloatingCta />
    </div>
  )
}
