'use client';

import { ExternalLink } from 'lucide-react';
import PillButton from '@/components/ui/PillButton';
import type { Template } from '@/data/templates';
import { useLanguage } from '@/components/LanguageProvider';

export default function TemplatePurchasePanel({
	template,
}: {
	template: Template;
}) {
	const { language } = useLanguage();
	return (
		<div className="rounded-2xl border border-ink/10 bg-paper p-6 sm:p-7">
			<div className="flex items-baseline gap-1.5">
				<span className="font-display text-4xl font-extrabold tracking-tight text-ink">
					${template.price}
				</span>
				<span className="text-sm text-ink/50">
					{template.currency} ·{' '}
					{language === 'id' ? 'sekali bayar' : 'one-time'}
				</span>
			</div>

			<div className="mt-6 flex flex-col gap-3">
				<PillButton
					href={template.purchaseUrl}
					cursorLabel="buy"
					className="w-full justify-center"
				>
					{language === 'id'
						? `Beli Template — $${template.price}`
						: `Buy Template — $${template.price}`}
				</PillButton>

				{template.liveDemoUrl ? (
					<PillButton
						href={template.liveDemoUrl}
						target="_blank"
						rel="noreferrer noopener"
						variant="outline"
						cursorLabel="explore"
						className="w-full justify-center"
					>
						{language === 'id' ? 'Lihat Demo Langsung' : 'View Live Demo'}
						<ExternalLink className="h-3.5 w-3.5" />
					</PillButton>
				) : (
					<button
						type="button"
						disabled
						className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink/35"
					>
						{language === 'id'
							? 'Demo Langsung — Segera Hadir'
							: 'Live Demo — Coming Soon'}
					</button>
				)}
			</div>

			<p className="mt-5 text-xs leading-relaxed text-ink/45">
				{language === 'id'
					? 'Dikirim langsung. Termasuk seluruh source code, dan pembaruan gratis selama 3 bulan.'
					: 'Instant delivery. Full source code,  and 3 months of free updates included.'}
			</p>
		</div>
	);
}
