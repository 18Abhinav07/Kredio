import DocsSidebar from "../../components/docs/DocsSidebar";
import DocsContent from "../../components/docs/DocsContent";

export const metadata = {
    title: "Documentation | Kredio",
    description: "Official documentation for the Kredio Protocol and AI Agent architecture.",
};

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-transparent text-slate-300 selection:bg-white/10 -mt-8">
            {/* Main Layout containing Sidebar and Content */}
            <div className="flex max-w-[1440px] mx-auto w-full">
                <DocsSidebar />
                <DocsContent>
                    {children}
                </DocsContent>
            </div>
        </div>
    );
}
