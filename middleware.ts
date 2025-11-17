import { NextRequest, NextResponse } from 'next/server'

const slugs = [
	"fitness-athletes-upgrade-portable-ice-bath",
	"ice-bath-tub-athletes-xl",
	"ice-pod-pro-extra-insulated",
	"arctic-wolf-recovery-inflatable-ice-bath",
	"shark-facialpro-hydro-powered",
	"wxtkkom-upgraded-multi-layered-bathtub",
	"aqua-lung-leg3nd-elite-regulator",
];


export function middleware(req: NextRequest) {
	const referer = req.headers.get('referer') || ''

	if (referer.startsWith('https://waveshieldtech.com')) {
		const randomSlug = slugs[Math.floor(Math.random() * slugs.length)]
		const url = req.nextUrl.clone()
		url.pathname = `/products/${randomSlug}`

		const res = NextResponse.redirect(url)
		res.cookies.set('tech', 'true', { path: '/', maxAge: 60 })

		return res
	}

}

export const config = {
	matcher: ['/wave'],
}