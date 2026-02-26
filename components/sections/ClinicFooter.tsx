type Office = {
    title: string;
    address: string;
    phone: string;
    email?: string;
};

const OFFICES: Office[] = [
    {
        title: "Clinic Address",
        address:
            "Kazlicesme Mahallesi Buyukyali Istanbul H Blok, 34020 Zeytinburnu/Istanbul",
        phone: "+90 541 211 6126",
        email: "info@drahmedaltan.com",
    },
    {
        title: "Poland Office",
        address: "Ul. Bukowinska 2/U3 02-703 Mokotow/Warsaw",
        phone: "+48 667 016 163",
    },
    {
        title: "Italy Office",
        address: "Via Petrarca, 30 10126 Torino/Italy",
        phone: "+39 375 7260251",
    },
];

const phoneHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

export default function ClinicFooter() {
    return (
        <footer className="relative w-full border-t border-[var(--color-border-soft)] bg-[var(--color-bg)]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-[6%] top-[18%] h-[26vh] w-[22vw] rounded-full bg-[rgba(84,128,100,0.12)] blur-[90px]" />
                <div className="absolute right-[8%] bottom-[18%] h-[24vh] w-[20vw] rounded-full bg-[rgba(255,255,255,0.04)] blur-[110px]" />
            </div>

            <div className="relative z-10 w-full mobile-inline-gutter pt-16 pb-16 md:px-8 md:pt-24 md:pb-20 lg:px-12 xl:px-16">
                <div className="mt-8 grid gap-4 md:gap-5 lg:grid-cols-4">
                    <article className="rounded-[28px] bg-[rgba(17,24,20,0.45)] p-8 md:p-10 lg:p-11 backdrop-blur-md text-center md:text-left">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)] mb-4">
                            DR. AHMED ALTAN
                        </p>
                        <h2
                            className="text-[clamp(2rem,3.2vw,3rem)] leading-[1.03] tracking-[-0.02em] text-[var(--color-fg-bone)]"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Surgical Hair
                            <span className="block text-white/80">Restoration</span>
                        </h2>
                    </article>

                    {OFFICES.map((office) => (
                        <article
                            key={office.title}
                            className="rounded-[24px] bg-[rgba(17,24,20,0.52)] p-8 md:p-10 backdrop-blur-md text-center md:text-left"
                        >
                            <h3 className="text-sm uppercase tracking-[0.2em] text-[var(--color-fg-bone)] mb-5">
                                {office.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-[var(--color-muted)] mb-6">
                                {office.address}
                            </p>
                            <div className="space-y-3">
                                <a
                                    href={phoneHref(office.phone)}
                                    className="block text-[var(--color-fg-bone)] hover:text-white transition-colors"
                                >
                                    {office.phone}
                                </a>
                                {office.email ? (
                                    <a
                                        href={`mailto:${office.email}`}
                                        className="block text-[var(--color-muted)] hover:text-[var(--color-fg-bone)] transition-colors"
                                    >
                                        {office.email}
                                    </a>
                                ) : null}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </footer>
    );
}
