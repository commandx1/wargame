import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Particle } from "../types/animations";
import type { Item } from "../types/item";

const LevelUpAnimation = ({
	item,
	isAnimating,
	particles,
	setParticles,
}: {
	item: Item;
	isAnimating: boolean;
	particles: Particle[];
	setParticles: React.Dispatch<React.SetStateAction<Particle[]>>;
}) => {
	const isLevel3Animation = item.level === 3 && isAnimating;

	useEffect(() => {
		if (particles.length === 0) return;

		const interval = setInterval(() => {
			setParticles((prev: Particle[]) =>
				prev
					.map((particle) => ({
						...particle,
						x: particle.x + particle.vx,
						y: particle.y + particle.vy,
						life: particle.life - 1,
						vy: particle.vy + 0.05,
						vx: particle.vx * 0.99,
					}))
					.filter(
						(particle) =>
							particle.life > 0 &&
							particle.x > -20 &&
							particle.x < 420 &&
							particle.y > -20 &&
							particle.y < 420,
					),
			);
		}, 16);

		return () => clearInterval(interval);
	}, [particles.length, setParticles]);

	return (
		<>
			{/* Card Background Effect during animation */}
			{isAnimating && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10"
				/>
			)}

			{/* Particles - Card içinde */}
			<AnimatePresence>
				{particles.map((particle) => (
					<motion.div
						key={particle.id}
						initial={{ opacity: 1, scale: 1 }}
						animate={{
							opacity: particle.life / particle.maxLife,
							scale: [1, 1.5, 0.5],
							rotate: [0, 360],
						}}
						exit={{ opacity: 0, scale: 0 }}
						className="absolute pointer-events-none rounded-full z-20"
						style={{
							left: particle.x,
							top: particle.y,
							width: particle.size,
							height: particle.size,
							backgroundColor: particle.color,
							boxShadow: `0 0 ${particle.size * (isLevel3Animation ? 4 : 2)}px ${particle.color}`,
							filter: "blur(0.5px)",
						}}
					/>
				))}
			</AnimatePresence>

			{/* Lightning Effects - Level 3 için daha fazla */}
			{isAnimating &&
				[...Array(isLevel3Animation ? 12 : 6)].map((_, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, scaleY: 0 }}
						animate={{
							opacity: [0, 1, 0],
							scaleY: [0, 1, 0],
							x: [
								0,
								Math.random() * (isLevel3Animation ? 150 : 100) -
									(isLevel3Animation ? 75 : 50),
							],
							rotate: [
								0,
								Math.random() * (isLevel3Animation ? 45 : 30) -
									(isLevel3Animation ? 22.5 : 15),
							],
						}}
						transition={{
							duration: 0.8 + Math.random() * 0.4,
							times: [0, 0.3, 1],
							delay: Math.random() * (isLevel3Animation ? 2 : 1),
							repeat: isLevel3Animation ? 2 : 1,
						}}
						className="absolute w-1 h-full bg-gradient-to-b from-yellow-400 via-white to-yellow-400 z-20"
						style={{
							left: `${20 + Math.random() * 60}%`,
							filter: "blur(1px)",
							boxShadow: `0 0 ${isLevel3Animation ? 30 : 20}px #FFD700`,
						}}
					/>
				))}

			{/* Massive Explosion - Level 3 için daha büyük */}
			{isAnimating && (
				<motion.div
					initial={{ scale: 0, opacity: 1 }}
					animate={{
						scale: [0, isLevel3Animation ? 3 : 2, isLevel3Animation ? 6 : 4],
						opacity: [1, 0.8, 0],
					}}
					transition={{ duration: isLevel3Animation ? 4 : 2.5 }}
					className="absolute inset-0 rounded-lg z-15"
					style={{
						background: isLevel3Animation
							? "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,215,0,0.9) 15%, rgba(255,165,0,0.8) 30%, rgba(155,89,182,0.6) 50%, transparent 80%)"
							: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,215,0,0.8) 20%, rgba(255,165,0,0.6) 40%, transparent 70%)",
						filter: "blur(2px)",
					}}
				/>
			)}

			{/* Multiple Explosion Waves for Level 3 */}
			{isLevel3Animation &&
				[...Array(3)].map((_, i) => (
					<motion.div
						key={`wave-${i}`}
						initial={{ scale: 0, opacity: 0.8 }}
						animate={{
							scale: [0, 2 + i, 4 + i * 2],
							opacity: [0.8, 0.4, 0],
						}}
						transition={{ duration: 3, delay: i * 0.8 }}
						className="absolute inset-0 rounded-lg z-14"
						style={{
							background:
								"radial-gradient(circle, rgba(155,89,182,0.6) 0%, rgba(78,205,196,0.4) 30%, transparent 60%)",
							filter: "blur(3px)",
						}}
					/>
				))}

			{/* Energy Rings - Level 3 için daha fazla */}
			{isAnimating &&
				[...Array(isLevel3Animation ? 5 : 3)].map((_, i) => (
					<motion.div
						key={i}
						initial={{ scale: 0, opacity: 0.8 }}
						animate={{
							scale: [0, 1.5 + i * 0.5, 3 + i],
							opacity: [0.8, 0.4, 0],
						}}
						transition={{
							duration: isLevel3Animation ? 3 : 2,
							delay: i * 0.4,
						}}
						className="absolute inset-4 rounded-full border-2 z-15"
						style={{
							borderColor:
								isLevel3Animation && i % 2 === 1 ? "#9B59B6" : "#FFD700",
							filter: "blur(1px)",
							boxShadow: `0 0 30px ${isLevel3Animation && i % 2 === 1 ? "#9B59B6" : "#FFD700"}`,
						}}
					/>
				))}

			<div className="relative z-30 pointer-events-none">
				<AnimatePresence mode="wait">
					<motion.div
						key={`item-${item.level}`}
						initial={
							isAnimating
								? {
										opacity: 0,
										scale: 0.1,
										rotateY: -180,
										rotateZ: -90,
										filter: "blur(30px) brightness(0.2)",
									}
								: { opacity: 1, scale: 1 }
						}
						animate={
							isAnimating
								? {
										opacity: [0, 0.3, 0.7, 1],
										scale: [0.1, 0.5],
										rotateY: [180, 90, 0],
										rotateZ: [90, 45, 0],
										filter: isLevel3Animation
											? [
													"blur(30px) brightness(0.2)",
													"blur(20px) brightness(1)",
													"blur(10px) brightness(2)",
													"blur(5px) brightness(4) saturate(3)",
													"blur(0px) brightness(3) saturate(2.5)",
													"blur(0px) brightness(1) saturate(1)",
												]
											: [
													"blur(30px) brightness(0.2)",
													"blur(15px) brightness(1)",
													"blur(5px) brightness(2.5) saturate(2)",
													"blur(0px) brightness(2) saturate(1.8)",
													"blur(0px) brightness(1) saturate(1)",
												],
									}
								: { opacity: 1, scale: 1, filter: "brightness(1) saturate(1)" }
						}
						exit={
							isAnimating
								? {
										opacity: [1, 0],
										scale: [1, 0.1],
										rotateY: [0, 90, 180],
										rotateZ: [0, 45, 90],
										filter: [
											"blur(0px) brightness(1.5)",
											"blur(10px) brightness(3)",
											"blur(20px) brightness(4)",
											"blur(30px) brightness(0.2)",
										],
									}
								: { opacity: 1, scale: 1 }
						}
						transition={{
							duration: isAnimating ? (isLevel3Animation ? 4 : 2.5) : 0.5,
							ease: [0.25, 0.46, 0.45, 0.94],
							opacity: isAnimating ? { times: [0, 0.3, 0.7, 1] } : {},
							scale: isAnimating
								? {
										type: "spring",
										stiffness: 80,
										damping: 15,
										times: isLevel3Animation
											? [0, 0.2, 0.5, 0.7, 0.9, 1]
											: [0, 0.4, 0.7, 0.9, 1],
									}
								: {},
							rotateY: isAnimating ? { times: [0, 0.6, 1] } : {},
							rotateZ: isAnimating ? { times: [0, 0.6, 1] } : {},
							filter: isAnimating
								? {
										times: isLevel3Animation
											? [0, 0.15, 0.3, 0.5, 0.8, 1]
											: [0, 0.2, 0.5, 0.8, 1],
									}
								: {},
						}}
						className="relative"
					>
						<motion.img
							src={`/game/${item.name}.webp`}
							alt={item.title}
							className="object-cover"
							animate={
								isAnimating
									? {
											opacity: 1,
											filter: isLevel3Animation
												? [
														"brightness(1.5) saturate(1.5) drop-shadow(0 0 10px rgba(255,215,0,0.5))",
														"brightness(3) saturate(2.5) drop-shadow(0 0 40px rgba(255,215,0,1))",
														"brightness(4) saturate(3) drop-shadow(0 0 60px rgba(155,89,182,1))",
														"brightness(3.5) saturate(2.8) drop-shadow(0 0 50px rgba(78,205,196,1))",
														"brightness(2.5) saturate(2.2) drop-shadow(0 0 30px rgba(255,215,0,0.8))",
														"brightness(1.5) saturate(1.5) drop-shadow(0 0 10px rgba(255,215,0,0.3))",
														"brightness(1) saturate(1) drop-shadow(0 0 0px rgba(255,215,0,0))",
													]
												: [
														"brightness(1.5) saturate(1.5) drop-shadow(0 0 10px rgba(255,215,0,0.5))",
														"brightness(2.5) saturate(2) drop-shadow(0 0 30px rgba(255,215,0,1))",
														"brightness(3) saturate(2.5) drop-shadow(0 0 40px rgba(255,215,0,1))",
														"brightness(2) saturate(2) drop-shadow(0 0 25px rgba(255,215,0,0.8))",
														"brightness(1.2) saturate(1.2) drop-shadow(0 0 5px rgba(255,215,0,0.3))",
														"brightness(1) saturate(1) drop-shadow(0 0 0px rgba(255,215,0,0))",
													],
										}
									: {
											opacity: 0,
											filter:
												"brightness(1) saturate(1) drop-shadow(0 0 0px rgba(255,215,0,0))",
										}
							}
							transition={
								isAnimating
									? {
											filter: {
												duration: isLevel3Animation ? 5 : 3.5,
												times: isLevel3Animation
													? [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1]
													: [0, 0.2, 0.4, 0.6, 0.8, 1],
												ease: "easeOut",
											},
										}
									: {
											filter: { duration: 0.5 },
										}
							}
						/>

						{/* Enhanced Aura for Level 3 */}
						{isAnimating && (
							<motion.div
								className="absolute inset-0 rounded-full"
								initial={{ opacity: 0, scale: 0 }}
								animate={{
									opacity: isLevel3Animation
										? [0, 0.6, 0.8, 0.6, 0.4, 0.2, 0]
										: [0, 0.4, 0.6, 0.4, 0.2, 0],
									scale: isLevel3Animation
										? [0, 0.5, 1, 1.5, 1.2, 1, 0.8]
										: [0, 0.8, 1.3, 1.1, 1, 0.8],
									background: isLevel3Animation
										? [
												"radial-gradient(ellipse, rgba(255,215,0,0.2) 0%, rgba(255,165,0,0.1) 50%, transparent 100%)",
												"radial-gradient(ellipse, rgba(255,215,0,0.6) 0%, rgba(255,165,0,0.3) 50%, transparent 100%)",
												"radial-gradient(ellipse, rgba(155,89,182,0.8) 0%, rgba(78,205,196,0.4) 50%, transparent 100%)",
												"radial-gradient(ellipse, rgba(78,205,196,0.6) 0%, rgba(155,89,182,0.3) 50%, transparent 100%)",
												"radial-gradient(ellipse, rgba(255,215,0,0.4) 0%, rgba(255,165,0,0.2) 50%, transparent 100%)",
												"radial-gradient(ellipse, rgba(255,215,0,0.2) 0%, rgba(255,165,0,0.1) 50%, transparent 100%)",
												"radial-gradient(ellipse, rgba(255,215,0,0) 0%, rgba(255,165,0,0) 50%, transparent 100%)",
											]
										: [
												"radial-gradient(ellipse, rgba(255,215,0,0.2) 0%, rgba(255,165,0,0.1) 50%, transparent 100%)",
												"radial-gradient(ellipse, rgba(255,215,0,0.4) 0%, rgba(255,165,0,0.2) 50%, transparent 100%)",
												"radial-gradient(ellipse, rgba(255,215,0,0.6) 0%, rgba(255,165,0,0.3) 50%, transparent 100%)",
												"radial-gradient(ellipse, rgba(255,215,0,0.4) 0%, rgba(255,165,0,0.2) 50%, transparent 100%)",
												"radial-gradient(ellipse, rgba(255,215,0,0.2) 0%, rgba(255,165,0,0.1) 50%, transparent 100%)",
												"radial-gradient(ellipse, rgba(255,215,0,0) 0%, rgba(255,165,0,0) 50%, transparent 100%)",
											],
								}}
								transition={{
									duration: isLevel3Animation ? 5 : 3.5,
									times: isLevel3Animation
										? [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1]
										: [0, 0.2, 0.4, 0.6, 0.8, 1],
									ease: "easeOut",
								}}
							/>
						)}

						{/* Enhanced Energy Rings for Level 3 */}
						{isAnimating &&
							[...Array(isLevel3Animation ? 4 : 2)].map((_, i) => (
								<motion.div
									key={i}
									className="absolute inset-0 rounded-full border-2"
									initial={{ scale: 0, opacity: 0 }}
									animate={{
										scale: isLevel3Animation
											? [
													0,
													0.8 + i * 0.2,
													1.8 + i * 0.3,
													1.5 + i * 0.2,
													1.2 + i * 0.1,
													1 + i * 0.05,
												]
											: [
													0,
													1 + i * 0.3,
													1.5 + i * 0.3,
													1.2 + i * 0.2,
													1 + i * 0.1,
												],
										opacity: isLevel3Animation
											? [0, 0.9, 0.6, 0.4, 0.2, 0]
											: [0, 0.8, 0.4, 0.2, 0],
										rotate: isLevel3Animation
											? [0, 180, 360, 540, 720]
											: [0, 180, 360, 540],
									}}
									transition={{
										duration: isLevel3Animation ? 5 : 3.5,
										times: isLevel3Animation
											? [0, 0.2, 0.4, 0.6, 0.8, 1]
											: [0, 0.3, 0.6, 0.8, 1],
										delay: i * 0.3,
										ease: "easeOut",
									}}
									style={{
										borderColor:
											isLevel3Animation && i % 2 === 1 ? "#9B59B6" : "#FFD700",
										filter: "blur(1px)",
										boxShadow: `0 0 ${isLevel3Animation ? 25 : 15}px ${isLevel3Animation && i % 2 === 1 ? "#9B59B6" : "#FFD700"}`,
									}}
								/>
							))}
					</motion.div>
				</AnimatePresence>
			</div>
		</>
	);
};

export default LevelUpAnimation;
