import { Header } from '@/components/blocks/Header';
import { headerSchema } from '@/components/blocks/Header/header.schema';
import headerData from '@/components/blocks/Header/data.example.json';

import { Hero } from '@/components/blocks/Hero';
import { heroSchema } from '@/components/blocks/Hero/hero.schema';
import heroData from '@/components/blocks/Hero/data.example.json';

import { Features } from '@/components/blocks/Features';
import { featuresSchema } from '@/components/blocks/Features/features.schema';
import featuresData from '@/components/blocks/Features/data.example.json';

import { Pricing } from '@/components/blocks/Pricing';
import { pricingSchema } from '@/components/blocks/Pricing/pricing.schema';
import pricingData from '@/components/blocks/Pricing/data.example.json';

import { HowItWorks } from '@/components/blocks/HowItWorks';
import { howItWorksSchema } from '@/components/blocks/HowItWorks/how-it-works.schema';
import howItWorksData from '@/components/blocks/HowItWorks/data.example.json';

import { Cta } from '@/components/blocks/Cta';
import { ctaSchema } from '@/components/blocks/Cta/cta.schema';
import ctaData from '@/components/blocks/Cta/data.example.json';

import { Contact } from '@/components/blocks/Contact';
import { contactSchema } from '@/components/blocks/Contact/contact.schema';
import contactData from '@/components/blocks/Contact/data.example.json';

import { Footer } from '@/components/blocks/Footer';
import { footerSchema } from '@/components/blocks/Footer/footer.schema';
import footerData from '@/components/blocks/Footer/data.example.json';

export default function Home() {
  // 2. Validar os dados
  const validatedHeaderData = headerSchema.parse(headerData);
  const validatedHeroData = heroSchema.parse(heroData);
  const validatedFeaturesData = featuresSchema.parse(featuresData);
  const validatedPricingData = pricingSchema.parse(pricingData);
  const validatedHowItWorksData = howItWorksSchema.parse(howItWorksData);
  const validatedCtaData = ctaSchema.parse(ctaData);
  const validatedContactData = contactSchema.parse(contactData);
  const validatedFooterData = footerSchema.parse(footerData);

  return (
    <main>
      <Header data={validatedHeaderData} />
      <Hero data={validatedHeroData} />
      <Features data={validatedFeaturesData} />
      <Pricing data={validatedPricingData} />
      <HowItWorks data={validatedHowItWorksData} />
      <Cta data={validatedCtaData} />
      <Contact data={validatedContactData} />
      <Footer data={validatedFooterData} />
    </main>
  );
}