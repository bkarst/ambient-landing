import { JsonLd } from '@/components/seo/JsonLd';
import { faqPageJsonLd, softwareApplicationJsonLd } from '@/lib/seo/json-ld';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { Hero } from '@/components/sections/Hero';
import { IntegrationsMarquee } from '@/components/sections/IntegrationsMarquee';
import { WhyReceipts } from '@/components/sections/WhyReceipts';
import { DashboardShowcase } from '@/components/sections/DashboardShowcase';
import { Lens } from '@/components/sections/Lens';
import { SpendOverTime } from '@/components/dashboards/chapters/SpendOverTime';
import { VendorsModels } from '@/components/dashboards/chapters/VendorsModels';
import { Tasks } from '@/components/dashboards/chapters/Tasks';
import { Teams } from '@/components/dashboards/chapters/Teams';
import { Waste } from '@/components/dashboards/chapters/Waste';
import { Budgets } from '@/components/dashboards/chapters/Budgets';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Trust } from '@/components/sections/Trust';
import { WhatsNext } from '@/components/sections/WhatsNext';
import { Faq } from '@/components/sections/Faq';
import { InterestSection } from '@/components/sections/InterestSection';
import { SiteFooter } from '@/components/sections/SiteFooter';

export default function Home() {
  return (
    <MotionProvider>
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={faqPageJsonLd()} />
      <SiteHeader />
      <main id="content">
        <Hero />
        <IntegrationsMarquee />
        <WhyReceipts />
        <DashboardShowcase />
        <Lens />
        <SpendOverTime />
        <VendorsModels />
        <Tasks />
        <Teams />
        <Waste />
        <Budgets />
        <HowItWorks />
        <Trust />
        <WhatsNext />
        <Faq />
        <InterestSection />
      </main>
      <SiteFooter />
    </MotionProvider>
  );
}
