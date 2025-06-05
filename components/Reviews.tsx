/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState, useRef } from 'react'
import { ImQuotesRight } from 'react-icons/im'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import fakeReviews from '@/fakedata/reviews.json'
import { IReview } from '@/types/review-type'

const Reviews = () => {
	const [reviews, setReviews] = useState<IReview[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [reviewsPerPage, setReviewsPerPage] = useState(3)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	// Load reviews
	useEffect(() => {
		setReviews(fakeReviews as IReview[])
	}, [])

	// Responsive: change number of reviews per page based on screen width
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setReviewsPerPage(1)
			} else {
				setReviewsPerPage(3)
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// Group reviews into pages
	const chunkedReviews = []
	for (let i = 0; i < reviews.length; i += reviewsPerPage) {
		chunkedReviews.push(reviews.slice(i, i + reviewsPerPage))
	}

	// Auto-slide logic
	useEffect(() => {
		if (chunkedReviews.length === 0) return
		intervalRef.current = setInterval(() => {
			setCurrentIndex(prev => (prev + 1) % chunkedReviews.length)
		}, 5000)

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current)
		}
	}, [chunkedReviews.length])

	const nextSlide = () => setCurrentIndex(prev => (prev + 1) % chunkedReviews.length)
	const prevSlide = () => setCurrentIndex(prev => (prev - 1 + chunkedReviews.length) % chunkedReviews.length)

	// Stars rendering
	const renderStars = (rating: number) => {
		const stars = []
		const fullStars = Math.floor(rating)
		const hasHalfStar = rating % 1 >= 0.5
		const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

		for (let i = 0; i < fullStars; i++) {
			stars.push(<FaStar key={i} className="text-yellow" />)
		}
		if (hasHalfStar) {
			stars.push(<FaStarHalfAlt key="half" className="text-yellow" />)
		}
		for (let i = 0; i < emptyStars; i++) {
			stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-500" />)
		}

		return stars
	}

	return (
		<div className="relative w-full max-w-[960px] mx-auto overflow-hidden">
			<div
				className="flex transition-transform duration-500 ease-in-out"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{chunkedReviews.map((group, index) => (
					<div
						key={index}
						className="flex flex-shrink-0 w-full justify-center gap-4 sm:gap-8"
						style={{ minWidth: '100%' }}
					>
						{group.map(review => (
							<div
								key={review.id}
								className="w-[90%] sm:w-[300px] h-[220px] bg-gray-900/80 text-gray-200 border-transparent rounded-sm flex flex-col items-center justify-between p-4"
							>
								<div className="flex flex-col justify-center items-end gap-2 p-2 rounded-sm bg-gray-800">
									<ImQuotesRight />
									<p className="text-sm sm:text-base text-right">{review.review}</p>
								</div>
								<div className="w-full flex items-start justify-start gap-4">
									<div className="w-[60px] h-[60px] border border-gray-200 rounded-full overflow-hidden">
										<img src={review.image} alt="" />
									</div>
									<div className="flex flex-col gap-1">
										<h4 className="font-semibold text-md">{review.name}</h4>
										<div className="flex justify-center items-center gap-2">
											<div className="text-sm font-thin">{review.rating}</div>
											<div className="flex items-center gap-1 text-sm">{renderStars(review.rating)}</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				))}
			</div>
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 flex justify-between items-center gap-2 z-10">
				<button onClick={prevSlide} className="w-12 bg-gray-800 text-white p-2 rounded-sm">
					❮
				</button>
				<button onClick={nextSlide} className="w-12 bg-gray-800 text-white p-2 rounded-sm">
					❯
				</button>
			</div>
		</div>
	)
}

export default Reviews
