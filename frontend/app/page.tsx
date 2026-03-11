'use client';

import { useEffect } from 'react';
import {
    HeroSection,
    TopologySection,
    FeaturesSection,
    TiersSection,
    CTASection,
    FooterSection,
    HowItWorksSection,
} from '../components/landing-modules';

export default function Home() {
    useEffect(() => {
        const html = document.documentElement;
        html.style.scrollSnapType = 'y mandatory';
        html.style.scrollBehavior = 'smooth';
        html.style.scrollPaddingTop = '64px';
        return () => {
            html.style.scrollSnapType = '';
            html.style.scrollBehavior = '';
            html.style.scrollPaddingTop = '';
        };
    }, []);

    return (
        /* width:100% - stays within the layout container, no overflow */
        <div style={{ width: '100%', maxWidth: '100%' }}>
            <HeroSection />
            <TopologySection />
            <FeaturesSection />
            <HowItWorksSection />
            <TiersSection />
            <CTASection />
            <FooterSection />
        </div>
    );
}
