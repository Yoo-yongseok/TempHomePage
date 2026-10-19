import { useParams } from 'react-router'
import { findService } from '../content/services'
import { CaseList } from '../features/service/CaseList'
import { CtaBanner } from '../features/service/CtaBanner'
import { FeatureSection } from '../features/service/FeatureSection'
import { ServiceHero } from '../features/service/ServiceHero'
import { PlaceholderPage } from './PlaceholderPage'

export function ServicePage() {
  const service = findService(useParams().slug)
  if (!service) return <PlaceholderPage title="페이지를 찾을 수 없습니다" />

  return (
    // key: 다른 서비스로 이동하면 히어로 애니메이션을 처음부터 다시 재생
    <div key={service.slug}>
      <ServiceHero service={service} />
      <section className="px-5 pt-[100px] md:px-10">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-[80px] pb-[60px] md:gap-[100px] md:pb-[100px]">
          {service.features.map((f, i) => (
            <FeatureSection key={f.title} index={i} {...f} />
          ))}
        </div>
      </section>
      {service.cases && <CaseList {...service.cases} />}
      <CtaBanner
        text={service.cta.text}
        secondary={service.cta.showSecondary ? service.hero.secondaryCta : undefined}
      />
    </div>
  )
}
