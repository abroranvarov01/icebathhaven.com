import type React from "react"
import type { Metadata } from "next"
import { Cinzel_Decorative, Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const cinzelDecorative = Cinzel_Decorative({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-cinzel",
})

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
})

export const metadata: Metadata = {
	title: "IceBath Haven - Premium Cold Plunge Experience",
	description:
		"Discover the transformative power of cold therapy with our curated selection of premium ice baths and cold plunge tubs.",
	referrer: 'unsafe-url',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} ${cinzelDecorative.variable} font-sans antialiased`}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
