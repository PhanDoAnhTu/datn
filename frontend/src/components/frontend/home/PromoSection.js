
export default function PromoSection() {
  return (
    <div className="bg-white dark:bg-stone-900">
      <div className="mx-auto max-w-screen-2xl gap-4 px-4 py-8  sm:px-6 sm:py-10 lg:max-w-full lg:gap-8 lg:px-8">
        <div className="overflow-hidden rounded-xl bg-gray-500 text-white shadow-md">
          <div className="relative">
            <img
              className="h-auto max-w-full object-cover"
              src="https://www.fjallraven.com/4932a5/globalassets/fjallraven/eu/startpage/ss24/w-10/hero_trousers_dt_2.jpg?width=1920&mode=Min&bgcolor=fff&quality=100"
              alt="test"
            />
            <div className="absolute left-0 right-0 top-1/3 flex justify-center max-sm:top-1/4">
              <div className="relative flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-white max-sm:my-1 max-sm:text-lg lg:text-4xl">
                  DURABLE, FUNCTIONAL, TIMELESS
                </h1>
                <h1 className="my-3 text-lg font-semibold text-white max-sm:my-1  max-sm:text-xs lg:text-xl">
                  The right trekking trousers make all the difference
                </h1>
                <button className="my-3 overflow-hidden rounded bg-white px-4 py-2 text-sm font-bold text-gray-800 shadow-md transition duration-200 ease-out hover:-translate-y-1 hover:text-xanthous-500 max-sm:my-1 lg:px-6 lg:py-5 lg:text-sm">
                  Explore now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
