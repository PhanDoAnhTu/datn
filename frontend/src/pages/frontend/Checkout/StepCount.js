export default function StepCount({ step }) {
    return (
        <div className="pointer-events-none mb-6 flex w-full justify-center space-x-6">
            <div className="flex flex-col items-center space-y-1">
                <div
                    className={`border-b-2 px-6 py-4 text-xl font-bold text-white transition duration-500 ease-out max-sm:px-4 max-sm:py-2 ${step === 1 ? 'border-magenta-500 bg-magenta-500' : 'border-white'}`}
                >
                    1
                </div>
                <span className="text-sm font-bold text-white max-sm:text-xs">
                    Cart & Shipping
                </span>
            </div>
            <div className="flex flex-col items-center space-y-1">
                <div
                    className={`border-b-2 px-6 py-4 text-xl font-bold text-white transition duration-500 ease-out max-sm:px-4 max-sm:py-2 ${step === 2 ? 'border-magenta-500 bg-magenta-500' : 'border-white'}`}
                >
                    2
                </div>
                <span className="text-sm font-bold text-white max-sm:text-xs">
                    Payment
                </span>
            </div>
            <div className="flex flex-col items-center space-y-1">
                <div
                    className={`border-b-2 px-6 py-4 text-xl font-bold text-white transition duration-500 ease-out max-sm:px-4 max-sm:py-2 ${step === 3 ? 'border-magenta-500 bg-magenta-500' : 'border-white'}`}
                >
                    3
                </div>
                <span className="text-sm font-bold text-white max-sm:text-xs">
                    Review your order
                </span>
            </div>
        </div>
    );
}
