import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CircleDoodle, StarDoodle } from '@/components/ui/Doodles';

export default function JournalSupportStrip() {
	return (
		<section className="relative border-t border-ink/10 bg-cream">
			<StarDoodle className="absolute right-[10%] top-8 hidden h-5 w-5 text-yellow/70 sm:block" />
			<CircleDoodle className="absolute bottom-8 left-[45%] hidden h-4 w-4 text-blue/40 lg:block" />
			<div className="mx-auto grid max-w-350 grid-cols-1 gap-12 px-5 py-16 sm:grid-cols-2 sm:gap-10 sm:divide-x sm:divide-ink/10 sm:px-8 sm:py-20 lg:px-12">
				<div id="journal" className="scroll-mt-24">
					<h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
						Journal
					</h3>
					<p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/65">
						Notes on design, code, and the small decisions behind each template.
					</p>
					<Link
						href="/journal"
						data-cursor="view"
						className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 transition-colors hover:text-ink"
					>
						Read the journal <ArrowUpRight className="h-3 w-3" />
					</Link>
				</div>
				<div id="support" className="scroll-mt-24 sm:pl-10">
					<h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
						Support
					</h3>
					<p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/65">
						Stuck on something? Reach us at{' '}
						<a
							href="mailto:teguhrinaldi23@gmail.com"
							data-cursor="view"
							className="underline decoration-ink/30 underline-offset-2 hover:text-ink hover:decoration-ink"
						>
							teguhrinaldi23@gmail.com
						</a>{' '}
						— we&apos;re here when you need us.
					</p>
					<a
						href="mailto:teguhrinaldi23@gmail.com"
						data-cursor="view"
						className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 transition-colors hover:text-ink"
					>
						Say hello <ArrowUpRight className="h-3 w-3" />
					</a>
				</div>
			</div>
		</section>
	);
}
