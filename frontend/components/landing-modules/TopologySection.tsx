'use client';

import { motion } from 'framer-motion';
import CpuCircuit from './CpuCircuit';
import { SECTION } from './tokens';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } } };

export function TopologySection() {
    return (
        <section style={{ ...SECTION, alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                initial="hidden" animate="show" variants={fadeUp}
                style={{ width: '85%', maxWidth: '1400px', display: 'flex', justifyContent: 'center' }}
            >
                <CpuCircuit />
            </motion.div>
        </section>
    );
}
