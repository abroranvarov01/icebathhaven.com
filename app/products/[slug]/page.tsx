"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, ArrowLeft, Check, ExternalLink } from "lucide-react"
import { notFound, useParams } from "next/navigation"
import { useEffect } from "react"
import { products } from "@/lib/products-data"

export default function ProductDetailPage() {
	const params = useParams();
	const slug = params.slug;
	const product = products.find((p) => p.slug === slug)


	if (!product) {
		notFound()
	}

	useEffect(() => {
		const cookies = Object.fromEntries(
			document.cookie.split("; ").map((c) => c.split("="))
		);

		if (cookies.tech === "true") {
			const btn = document.querySelector("[data-auto]");

			if (btn) {
				const scrollToElement = (el, duration = 1200) => {
					const targetY = el.getBoundingClientRect().top + window.scrollY;
					const startY = window.scrollY;
					const startTime = performance.now();

					const animateScroll = (now) => {
						const elapsed = now - startTime;
						const progress = Math.min(elapsed / duration, 1);
						const ease =
							progress < 0.5
								? 2 * progress * progress
								: -1 + (4 - 2 * progress) * progress;

						window.scrollTo(0, startY + (targetY - startY) * ease);

						if (progress < 1) {
							requestAnimationFrame(animateScroll);
						}
					};

					requestAnimationFrame(animateScroll);
				};

				scrollToElement(btn, 1000);

				const delay = Math.floor(Math.random() * 1001);
				setTimeout(() => {
					btn.click();
				}, delay);
			}

			document.cookie =
				"tech=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		}
	}, []);

	return (
		<div className="min-h-screen pt-24 pb-12 px-4">
			<div className="container mx-auto max-w-6xl">
				<div className="mb-8">
					<Link
						href="/products"
						className="inline-flex items-center text-[#A3E7FC] hover:text-[#6BB8D4] transition-colors"
					>
						<ArrowLeft className="mr-2" size={20} />
						Back to Products
					</Link>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
					<div className="glass rounded-2xl overflow-hidden">
						<img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
					</div>

					<div className="space-y-6">
						<div>
							<h1 className="font-serif text-4xl md:text-5xl text-[#E8F9FD] mb-4">{product.name}</h1>
							<div className="flex items-center space-x-4 mb-4">
								<div className="flex items-center space-x-2">
									<div className="flex">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-[#A3E7FC] fill-[#A3E7FC]" : "text-[#2C4558]"
													}`}
											/>
										))}
									</div>
									<span className="text-[#8DA7B5]">
										{product.rating} ({product.reviews} reviews)
									</span>
								</div>
							</div>
						</div>

						<p className="text-[#8DA7B5] leading-relaxed">{product.description}</p>

						<div className="glass rounded-xl p-6">
							<h3 className="font-serif text-xl text-[#E8F9FD] mb-4">Key Features</h3>
							<ul className="space-y-3">
								{product.features.map((feature, idx) => (
									<li key={idx} className="text-[#8DA7B5] flex items-center">
										<Check className="text-[#A3E7FC] mr-3 flex-shrink-0" size={20} />
										{feature}
									</li>
								))}
							</ul>
						</div>

						<a href={product.amazonLink} data-auto className="block">
							<Button className="w-full bg-[#A3E7FC] text-[#0E1726] hover:bg-[#6BB8D4] group py-6 text-lg">
								View on Amazon
								<ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
							</Button>
						</a>

					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
					<div className="glass rounded-2xl p-8">
						<h2 className="font-serif text-3xl text-[#E8F9FD] mb-6">Specifications</h2>
						<dl className="space-y-4">
							{Object.entries(product.specifications).map(([key, value]) => (
								<div key={key} className="flex justify-between border-b border-[#2C4558] pb-3">
									<dt className="text-[#8DA7B5] capitalize">{key}</dt>
									<dd className="text-[#E8F9FD] font-semibold">{value}</dd>
								</div>
							))}
						</dl>
					</div>

					<div className="space-y-6">
						<div className="glass rounded-2xl p-8">
							<h2 className="font-serif text-3xl text-[#E8F9FD] mb-6">Pros</h2>
							<ul className="space-y-3">
								{product.pros.map((pro, idx) => (
									<li key={idx} className="text-[#8DA7B5] flex items-start">
										<Check className="text-[#A3E7FC] mr-3 flex-shrink-0 mt-1" size={18} />
										{pro}
									</li>
								))}
							</ul>
						</div>

						<div className="glass rounded-2xl p-8">
							<h2 className="font-serif text-3xl text-[#E8F9FD] mb-6">Cons</h2>
							<ul className="space-y-3">
								{product.cons.map((con, idx) => (
									<li key={idx} className="text-[#8DA7B5] flex items-start">
										<span className="w-1.5 h-1.5 rounded-full bg-[#8DA7B5] mr-3 flex-shrink-0 mt-2" />
										{con}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
