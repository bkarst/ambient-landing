import { landing } from '@/content/landing';
import { faq } from '@/content/faq';
import { Icon } from '@/components/ds/Icon';
import { FaqTracking } from './FaqTracking';
import { SectionIntro } from './SectionIntro';

const copy = landing.faq;

/** Native details/summary (§6.11): accessible, works without JS, and crawlable. */
export function Faq() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-heading">
      <div className="wrap grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 items-start">
        <div className="xl:col-span-4">
          <SectionIntro id="faq-heading" overline={copy.overline} heading={copy.heading} />
        </div>
        <div className="xl:col-span-8" data-faq>
          {faq.map((q) => (
            <details key={q.id} id={`faq-${q.id}`} className="faq-item" data-faq-id={q.id}>
              <summary>
                <span>{q.question}</span>
                <Icon name="chevron-down" size={20} />
              </summary>
              <div className="faq-answer body">
                <p style={{ margin: 0 }}>{q.answer}</p>
              </div>
            </details>
          ))}
          <FaqTracking />
        </div>
      </div>
    </section>
  );
}
