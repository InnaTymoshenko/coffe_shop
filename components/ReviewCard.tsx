/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { ImQuotesRight } from 'react-icons/im'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { IReview } from '@/types/review-type'

type Props = {
	reviews: IReview[]
}

const ReviewCard = ({ reviews }: Props) => {
	const renderStars = (rating: number) => {
		const stars = []
		const fullStars = Math.floor(rating) // Кількість повних зірок
		const hasHalfStar = rating % 1 >= 0.5 // Якщо залишок >= 0.5, додаємо напівзірку
		const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0) // Решта заповнюється порожніми

		// Додаємо повні зірки
		for (let i = 0; i < fullStars; i++) {
			stars.push(<FaStar key={i} className="text-yellow" />)
		}

		// Додаємо напівзірку (якщо є)
		if (hasHalfStar) {
			stars.push(<FaStarHalfAlt key="half" className="text-yellow" />)
		}

		// Додаємо порожні зірки
		for (let i = 0; i < emptyStars; i++) {
			stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-500" />)
		}

		return stars
	}

	return (
		<>
			{reviews.map(review => (
				<div
					key={review.id}
					className="w-[300px] h-[200px] bg-gray-900/80 text-gray-200 border-transparent rounded-sm flex flex-col items-center justify-between p-4"
				>
					<div className="flex flex-col justify-center items-end gap-2 p-2 rounded-sm bg-gray-800">
						<ImQuotesRight />
						<p>{review.review}</p>
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
		</>
	)
}

export default ReviewCard
