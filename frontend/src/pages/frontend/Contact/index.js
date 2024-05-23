import { EnvelopeIcon, HomeIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function Contact() {
    return (
        <div className="flex justify-center pb-7 pt-10 md:pt-24">
            <div className="w-9/12 md:w-10/12">
                <h1 className="pl-9 text-3xl font-bold tracking-wide text-white md:pl-14 md:text-4xl">
                    CONTACT US
                </h1>
                <div className="mt-7 grid gap-5 md:grid-cols-3">
                    <div className="grid h-fit gap-5 bg-zinc-900/75 p-4">
                        <div className="flex flex-col text-white">
                            <div className="flex items-center space-x-2 text-lg">
                                <PhoneIcon className="h-6 w-6" />
                                <span>Phone number</span>
                            </div>
                            <div className="text-xl">+123-123-213-213</div>
                        </div>
                        <div className="flex flex-col text-white">
                            <div className="flex items-center space-x-2 text-lg">
                                <HomeIcon className="h-6 w-6" />
                                <span>Address</span>
                            </div>
                            <div className="text-justify text-xl">
                                20 Tang Nhon Phu B Street, Phuoc Long B Ward,
                                Thu Duc City, HCM City
                            </div>
                        </div>
                        <div className="flex flex-col text-white">
                            <div className="flex items-center space-x-2 text-lg">
                                <EnvelopeIcon className="h-6 w-6" />
                                <span>Email</span>
                            </div>
                            <div className="text-xl">abcdef@gmail.com</div>
                        </div>
                        <div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15674.987103826621!2d106.774999!3d10.8306805!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701a34a5d5f%3A0x30056b2fdf668565!2zQ2FvIMSQ4bqzbmcgQ8O0bmcgVGjGsMahbmcgVFAuSENN!5e0!3m2!1svi!2s!4v1712302739152!5m2!1svi!2s"
                                className="h-72 w-full border-0"
                                frameBorder="0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5 bg-zinc-900/75 p-4 md:col-span-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col -space-y-1 text-white">
                                <span className="text-sm">Full name*</span>
                                <input
                                    type="text"
                                    required
                                    placeholder="E.g. Jonhan Strauss"
                                    className="border-b-2 border-l-0 border-r-0 border-t-0 border-white bg-transparent pl-0 transition duration-500 ease-out placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0"
                                />
                            </div>
                            <div className="flex flex-col -space-y-1 text-white">
                                <span className="text-sm">Email*</span>
                                <input
                                    type="email"
                                    required
                                    placeholder="E.g. abc@gmail.com"
                                    className="border-b-2 border-l-0 border-r-0 border-t-0 border-white bg-transparent pl-0 transition duration-500 ease-out placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col -space-y-1 text-white">
                            <span className="text-sm">Title*</span>
                            <input
                                type="text"
                                required
                                placeholder="Your title here"
                                className="border-b-2 border-l-0 border-r-0 border-t-0 border-white bg-transparent pl-0 transition duration-500 ease-out placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0"
                            />
                        </div>
                        <div className="flex flex-col space-y-1 text-white">
                            <span className="text-sm">Detail*</span>
                            <textarea className="h-80 resize-none border-2 border-white bg-transparent text-justify text-sm transition duration-500 ease-out focus:border-magenta-500 focus:ring-0"></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button className="border-2 px-4 py-2 text-white transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
