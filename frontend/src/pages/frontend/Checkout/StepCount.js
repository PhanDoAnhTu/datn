export default function StepCount({ step }) {
    return (
        <div className="pointer-events-none mb-6 flex w-full justify-center space-x-6">
            <div className="flex flex-col items-center space-y-1 text-gray-900 dark:text-white">
                <div
                    className={`border-b-2 px-6 py-4 text-xl font-bold transition duration-500 ease-out max-sm:px-4 max-sm:py-2 ${step === 1 ? 'border-magenta-500 bg-magenta-500' : 'border-gray-900 dark:border-white'}`}
                >
                    1
                </div>
                <span className="text-sm font-bold max-sm:text-xs">
                    Thông tin cơ bản
                </span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-gray-900 dark:text-white">
                <div
                    className={`border-b-2 px-6 py-4 text-xl font-bold transition duration-500 ease-out max-sm:px-4 max-sm:py-2 ${step === 2 ? 'border-magenta-500 bg-magenta-500' : 'border-gray-900 dark:border-white'}`}
                >
                    2
                </div>
                <span className="text-sm font-bold max-sm:text-xs">
                    Phương thức thanh toán
                </span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-gray-900 dark:text-white">
                <div
                    className={`border-b-2 px-6 py-4 text-xl font-bold transition duration-500 ease-out max-sm:px-4 max-sm:py-2 ${step === 3 ? 'border-magenta-500 bg-magenta-500' : 'border-gray-900 dark:border-white'}`}
                >
                    3
                </div>
                <span className="text-sm font-bold max-sm:text-xs">
                    Kiểm tra lại
                </span>
            </div>
        </div>
    );
}
