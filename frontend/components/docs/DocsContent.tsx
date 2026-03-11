import React from 'react';

export default function DocsContent({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex-1 min-w-0 py-12 px-6 md:px-12 lg:px-16 w-full">
            <div className="max-w-[850px] mx-auto">
                <article className="prose prose-invert prose-slate max-w-none
                    prose-headings:font-light prose-headings:tracking-tight prose-headings:text-white
                    prose-h1:text-4xl prose-h1:mb-10 prose-h1:capitalize prose-h1:tracking-widest prose-h1:font-medium
                    prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3 prose-h2:font-medium
                    prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-medium
                    prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-4 prose-h4:font-medium
                    prose-p:text-slate-300 prose-p:leading-relaxed prose-p:font-light prose-p:mb-6
                    prose-a:text-white prose-a:underline prose-a:underline-offset-4 prose-a:decoration-white/20 hover:prose-a:decoration-white/80 transition-colors
                    prose-code:text-white prose-code:bg-white/5 prose-code:border prose-code:border-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:text-sm
                    prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-pre:text-slate-300 prose-pre:p-5 prose-pre:rounded-xl prose-pre:my-6
                    prose-strong:text-white prose-strong:font-medium
                    prose-ul:text-slate-300 prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:text-slate-300 prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                    prose-li:my-2 prose-li:leading-relaxed prose-li:marker:text-slate-500
                    prose-table:w-full prose-table:my-8 prose-th:bg-slate-900/50 prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 prose-th:border-b prose-th:border-slate-800 prose-td:border-b prose-td:border-slate-800/50 prose-th:font-medium prose-th:text-slate-300
                    prose-hr:border-white/5 prose-hr:my-12"
                >
                    {children}
                </article>
            </div>
        </main>
    );
}
