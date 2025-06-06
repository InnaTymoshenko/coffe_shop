import React from 'react'
import Shell from '@/components/ui/shell'
import { ContactForm } from '@/components/layouts/forms/contact-form'

const ContactsPage = () => {
	return (
		<>
			<div className="w-full h-[20vh] " />
			<div className="w-full flex flex-col gap-8 justify-start py-8 mb-8">
				<Shell className="container bg-gray-900/90 text-gray-200 flex flex-col gap-8 justify-start items-start rounded-sm">
					<h1 className="capitalize text-3xl my-6 ">Contact us</h1>
					<div className="w-full grid sm:grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<h2 className="text-xl font-semibold mb-2">{`Let's Talk`}</h2>
							<p className="mb-4">{`Have a question or just want to say hi? We'd love to hear from you!`}</p>

							<ul className="space-y-2 text-gray-400 mt-16">
								<li>
									<strong>Phone:</strong> +380 (55) 555 55 55
								</li>
								<li>
									<strong>Email:</strong> info@coffeetown.com
								</li>
								<li>
									<strong>Address:</strong> вул. Кавова, 12, Київ
								</li>
								<li>
									<strong>Working Hours:</strong> Mon–Sun: 08:00–20:00
								</li>
							</ul>
						</div>
						<ContactForm />
					</div>
				</Shell>
			</div>
			<div className="w-full min-h-[20vh] flex flex-col gap-8 justify-start py-8 mb-8" />
			<div className="fixed top-0 left-0 w-full h-screen bg-barista basic -z-10 " aria-hidden="true" />
		</>
	)
}

export default ContactsPage
