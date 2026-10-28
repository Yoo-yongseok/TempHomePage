import { MultiLine } from '../components/ui/MultiLine'
import { CONTACT_PAGE } from '../content/contact'
import { ContactForm } from '../features/contact/ContactForm'

export function ContactPage() {
  return (
    <section className="bg-gray-50 px-5 pt-[80px] pb-[100px] md:px-10 md:pt-[120px]">
      <div className="mx-auto max-w-[760px]">
        <div className="mb-10 text-center">
          <h1 className="text-[32px] leading-[1.2] font-bold text-gray-900 md:text-[44px]">{CONTACT_PAGE.title}</h1>
          <p className="mt-4 text-[16px] leading-[1.5] text-gray-500 md:text-[18px]">
            <MultiLine text={CONTACT_PAGE.subtitle} desktopOnly />
          </p>
        </div>
        <ContactForm className="border border-rule shadow-[0_1px_2px_#1018280a,0_16px_32px_-20px_#10182824]" />
      </div>
    </section>
  )
}
