<<<<<<< HEAD
import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import api from "@/utils/api";

export default function TrainingModal({ isOpen, closeModal,handleDataChange, id = null }) {
	const cancelButtonRef = useRef(null);
  const [positions, setPositions] = React.useState(null);
  const [article, setArticle] = React.useState(null);
	async function getPositions() {
    const response = await api.getPositions();
    setPositions(response);
  }

	async function getArticle() {
		const response = await api.getArticle(id);
		
		const Apositions = response.position_names.split(',').map(position => position.trim());
		response.position_1 =  Apositions[0];
		response.position_2 =  Apositions[1];
		response.position_3 =  Apositions[2];
		console.log(response);
		setArticle(response);

		
	}



	React.useEffect(() => {
		getPositions();
		if(id) {
			getArticle();
		}
	},[id])

	function handleChange(e) {
		const { name, value } = e.target;
		setArticle(prevState => ({
			...prevState,
			[name]: value
		}));
	}


	async function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		const response = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const { filePath } = await response.json();

		data.thumbnail = filePath;
		await api.createArticle(data).then(
			handleDataChange(),
			closeModal()
		)
	}

	async function handleUpdate(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		const response = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const { filePath } = await response.json();

		data.thumbnail = filePath;
		await api.updateArticle(data).then(
			handleDataChange(),
			closeModal()
		)
	}
=======
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function TrainingModal({ isOpen, closeModal, training = {} }) {
	const cancelButtonRef = useRef(null);
>>>>>>> 09dcef1f7342e23510b844a91aec959df4e5ce8c

	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog
				as="div"
<<<<<<< HEAD
				className="relative z-50"
=======
				className="relative z-10"
>>>>>>> 09dcef1f7342e23510b844a91aec959df4e5ce8c
				initialFocus={cancelButtonRef}
				onClose={closeModal}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
<<<<<<< HEAD
								<form className="relative bg-white rounded-lg shadow" onSubmit={id? handleUpdate : handleSubmit} >
									<input type="hidden" name="id" value={article?.id} />
									<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
										<h3 className="text-xl font-semibold text-gray-900">
											{ article ? "Update Training" : "Add Training" }
=======
								<form className="relative bg-white rounded-lg shadow">
									<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
										<h3 className="text-xl font-semibold text-gray-900">
											{ training ? "Update Training" : "Add Training" }
>>>>>>> 09dcef1f7342e23510b844a91aec959df4e5ce8c
										</h3>
										<button
											type="button"
											className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600"
											onClick={closeModal}
										>
											<svg
												className="w-3 h-3"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 14 14"
											>
												<path
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
												/>
											</svg>
											<span className="sr-only">Close modal</span>
										</button>
									</div>

									<div className="p-4 md:p-5 space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Training Name
                      </label>
                      <input
                        type="text"
                        id="name"
<<<<<<< HEAD
												name="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Name"
												value={article ? article.title : ""}
												onChange={(e) => handleChange(e)}
=======
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Name"
>>>>>>> 09dcef1f7342e23510b844a91aec959df4e5ce8c
                        required
                      />
                    </div>
                    <div>
<<<<<<< HEAD
											<div className="">
											<label
=======
                      <label
>>>>>>> 09dcef1f7342e23510b844a91aec959df4e5ce8c
                        htmlFor="age"
                        classage="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Position
                      </label>
<<<<<<< HEAD
                      
											</div>
											<div className=" flex flex-row gap-4">
											<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5" name="position_1" onChange={(e) => handleChange(e)}>
												<option value={0}>Select Position</option>
												{positions &&
													positions.map((position) => (
														<option
															key={position.id} // Add a unique key for each option
															value={position.id}
															selected={article?.position_1 == position.name}
														>
															{position.name}
														</option>
													))}
											</select>

											<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5" name="position_2" onChange={(e) => handleChange(e)}>
											<option value={0}>Select Position</option>
												{positions &&
													positions.map((position) => (
														<option
															key={position.id} // Add a unique key for each option
															value={position.id}
															selected={article?.position_2 == position.name}
														>
															{position.name}
														</option>
													))}
											</select>
											<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5" name="position_3" onChange={(e) => handleChange(e)}>
											<option value={0}>Select Position</option>
												{positions &&
													positions.map((position) => (
														<option
															key={position.id} // Add a unique key for each option
															value={position.id}
															selected={article?.position_3 == position.name}
														>
															{position.name}
														</option>
													))}
											</select>
											</div>
                    </div>
										<div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Short Description"
												name="body"
												value={article ? article.body : ""}
												onChange={(e) => handleChange(e)}
                        required
											/>
                    </div>
										<div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Steps (For Numerical Order Divide By Comma)
                      </label>
                      <textarea
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Training Steps"
												name="steps"
												value={article ? article.steps : ""}
												onChange={(e) => handleChange(e)}
												required
												/>
                    </div>
										<div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Gambar
                      </label>
											<input
												type="file"
												id="name"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
												placeholder="Thumbnail"
												name="thumbnail"
												
												onChange={(e) => handleChange(e)}
												required
											/>
=======
                      <input
                        type="number"
                        id="age"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Name"
                        required
                      />
>>>>>>> 09dcef1f7342e23510b844a91aec959df4e5ce8c
                    </div>
									</div>

									<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
										<button
<<<<<<< HEAD
											type="submit"
											className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
											
										>
											{article ? "Update" : "Create"}
=======
											type="button"
											className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
											onClick={closeModal}
										>
											Create Training
>>>>>>> 09dcef1f7342e23510b844a91aec959df4e5ce8c
										</button>
										<button
											type="button"
											className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
											onClick={closeModal}
										>
											Decline
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
