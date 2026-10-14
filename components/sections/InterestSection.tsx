import { landing } from '@/content/landing';
import { InterestForm } from '@/components/forms/InterestForm';
import { SectionIntro } from './SectionIntro';

const copy = landing.form;

/** The conversion (§6.12, §9). The form submit is this view's primary button. */
export function InterestSection() {
  return (
    <section id="request-access" className="section" aria-labelledby="access-heading" data-primary-owner>
      <div className="wrap grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 items-start">
        <div className="xl:col-span-5">
          <SectionIntro id="access-heading" overline={copy.overline} heading={copy.heading} body={copy.body} />
        </div>
        <div className="xl:col-span-7" style={{ maxWidth: 640, width: '100%' }}>
          <InterestForm />
        </div>
      </div>
    </section>
  );
}
