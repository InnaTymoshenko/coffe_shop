'use client'

import React from 'react'
import { BsTelephoneForward } from 'react-icons/bs'
import { RiTwitterXLine, RiTelegram2Fill, RiMailLine } from 'react-icons/ri'
import { SlSocialLinkedin, SlSocialInstagram, SlSocialFacebook, SlSocialDribbble } from 'react-icons/sl'
import Shell from './ui/shell'
import { getCurrentYear } from '@/utils/fn'
import Link from 'next/link'

// type Props = {}

const Footer = () => {
	return (
		<>
			<Shell className="container ">
				<div className="w-full grid grid-cols-5 gap-8">
					<div className="col-span-2">
						<h5 className="logo text-lg mb-4">Coffee town</h5>
						<p>
							is a place where the aroma of freshly brewed coffee meets a cozy atmosphere. We offer the finest coffee
							blends, homemade desserts, and friendly service to make every visit special.
						</p>
					</div>
					<div>
						<h5 className="mb-4 text-xl">Quick Links</h5>
						<div className="flex flex-col gap-2 ">
							<Link href={'/'}>Home</Link>
							<Link href={'/menu'}>Menu</Link>
							<Link href={'/'}>Features</Link>
							<Link href={'/'}>Traditional</Link>
							<Link href={'/#booking'}>Booking</Link>
							<Link href={'/#location'}>Location</Link>
						</div>
					</div>
					<div>
						<h5 className="mb-4 text-xl">Opening Hours</h5>
						<ul>
							<li>Mon: No Service</li>
							<li>Tue - Fri: 9am - 10pm</li>
							<li>Sat: 10am - 11pm</li>
							<li>Sun: 12am - 11pm</li>
						</ul>
					</div>
					<div>
						<h5 className="mb-4 text-xl">Stay In Touch</h5>
						<div>
							<div className="flex gap-2 items-center py-1">
								<BsTelephoneForward />
								<a
									className="hover:underline text-decoration-2 hover:text-gray-400"
									style={{ textUnderlineOffset: '6px' }}
									href="tel:+38055555555"
								>
									+38(055) 55 55 55
								</a>
							</div>
							<div className="flex gap-2 items-center py-1">
								<RiMailLine />
								<a
									className="hover:underline text-decoration-2 hover:text-gray-400"
									style={{ textUnderlineOffset: '6px' }}
									href="mailto:info@coffeetown.com"
								>
									info@coffeetown.com
								</a>
							</div>
							<div className="flex gap-4 items-center py-2">
								<SlSocialLinkedin size={20} className="cursor-pointer hover:text-gray-400" />
								<SlSocialFacebook size={20} className="cursor-pointer hover:text-gray-400" />
								<SlSocialDribbble size={20} className="cursor-pointer hover:text-gray-400" />
								<SlSocialInstagram size={20} className="cursor-pointer hover:text-gray-400" />
								<RiTwitterXLine size={20} className="cursor-pointer hover:text-gray-400" />
								<RiTelegram2Fill size={20} className="cursor-pointer hover:text-gray-400" />
							</div>
						</div>
					</div>
				</div>
			</Shell>
			<div className="w-full h-8 flex justify-center items-center text-gray-200 border-t-2 border-t-gray-900">
				{`©2014-${getCurrentYear()}. Coffee town. All rights reserved`}
			</div>
		</>
	)
}

export default Footer
