
export default function Subscribe() {

  return (
    <section className="">
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-8 text-center sm:px-6 lg:px-8 lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Subscribe to our newsletter
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 sm:px-16 lg:px-48 lg:text-xl dark:text-gray-200">
          Be the first to get exclusive offers and the latest news from us.
        </p>
        <form className="mx-auto w-full max-w-md">
          <label
            htmlFor="default-email"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email sign-up
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 rtl:inset-x-0">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="email"
              id="default-email"
              className="block w-full rounded-lg border border-gray-300 bg-stone-200 p-4 ps-10 text-sm text-gray-900 outline-none transition duration-200 ease-out focus:border-xanthous-500 focus:bg-stone-300 focus:ring-xanthous-500 dark:border-gray-700 dark:bg-stone-700 dark:text-white dark:placeholder-stone-300 dark:focus:bg-stone-800 "
              placeholder="Enter your email here..."
              required=""
            />
            <button
              type="submit"
              className="absolute bottom-2.5 end-2.5 rounded-lg  bg-xanthous-400 px-4 py-2 text-sm font-medium text-white transition duration-200  ease-out  hover:bg-xanthous-300 focus:outline-none focus:ring-blue-300"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
