import api from "@/utils/api";
import React from "react";
import { Slider } from "@nextui-org/slider";
const CardProfile = ({
	activeAttribute,
	player,
	positions,
	openPlayerModal,
}) => {
	function calculateAge(birthDateString) {
		const birthDate = new Date(birthDateString);

		const currentDate = new Date();

		let age = currentDate.getFullYear() - birthDate.getFullYear();

		if (
			currentDate.getMonth() < birthDate.getMonth() ||
			(currentDate.getMonth() === birthDate.getMonth() &&
				currentDate.getDate() < birthDate.getDate())
		) {
			age--;
		}

		return age;
	}

	console.log(positions, player, activeAttribute);
	return (
		<div className="flex md:flex-row flex-col gap-6 md:w-6/12">
			{/* User Image */}
			<img
				src={
					player.thumbnail
						? api.imageUrl(player.thumbnail)
						: "/img/img-1-1000x600.jpg"
				}
				alt=""
				className="md:w-64 md:h-80 rounded-xl shadow-xl"
			/>

			{/* User Details */}
			<div className="flex w-full">
				<div className="flex flex-col w-full bg-white mb-6 shadow-xl rounded-xl px-6 pt-6 pb-12  md:h-80 justify-between ">
					<div className="flex flex-row justify-between h-20">
						<div className="flex flex-col">
							<h3 className="font-semibold text-3xl">{player.name}</h3>
							<h4 className="text-xl text-gray-500">{player.player_alike}</h4>
						</div>
						<button
							className="bg-gray-100 text-gray-400 h-12 px-6 rounded-xl font-semibold flex items-center"
							onClick={openPlayerModal}
						>
							<span className="my-auto">Update</span>
						</button>
					</div>

					{/* User Stats */}
					<div className="grid grid-cols-3 justify-between mt-6">
						<div className="flex flex-col">
							<h4 className="text-sm text-center text-gray-500">Height</h4>
							<h3 className="text-2xl text-center  font-semibold">
								{activeAttribute.height} cm
							</h3>
						</div>
						<div className="flex flex-col">
							<h4 className="text-sm text-center text-gray-500">Weight</h4>
							<h3 className="text-2xl text-center font-semibold">
								{activeAttribute.weight} kg
							</h3>
						</div>
						<div className="flex flex-col">
							<h4 className="text-sm text-center text-gray-500">Age</h4>
							<h3 className="text-2xl text-center font-semibold">
								{calculateAge(player.birth_date? player.birth_date : player.birthdate)}
							</h3>
						</div>
					</div>
					<div className="flex flex-col col-span-3 mt-6">
						<h4 className="text-sm text-gray-500 text-center">Recommendation Position</h4>
						{positions != undefined ? (
							<div className="flex flex-col mt-4">
								<div className="flex justify-between gap-4 ">
									<h3 className=" text-right font-semibold w-32">{positions?.name} </h3>
									<Slider
										color="foreground"
										hideThumb={true}
										value={positions.score_1}
										minValue={0}
										maxValue={100}
										isDisabled={true}
										className=""
									/>
									<p className="w-32"> {Math.round(positions.score_1)} %</p>
								</div>
								<div className="flex justify-between gap-4">
									<h3 className=" text-right font-semibold w-32">
										{positions["pos2.name"]}
									</h3>
									<Slider
										color="foreground"
										hideThumb={true}
										value={positions.score_2}
										minValue={0}
										maxValue={100}
										isDisabled={true}
										className=""
									/>
									<p className="w-32"> {Math.round(positions.score_2)} %</p>
								</div>
								<div className="flex justify-between gap-4">
									<h3 className=" text-right font-semibold w-32">
										{positions["pos3.name"]}
									</h3>
									<Slider
										color="foreground"
										hideThumb={true}
										value={positions.score_3}
										minValue={0}
										maxValue={100}
										isDisabled={true}
										className=""
									/>
									<p className="w-32">{Math.round(positions.score_3)} % </p>
								</div>
							</div>
						) : (
							<h3 className="text-2xl text-center font-semibold">-</h3>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardProfile;
