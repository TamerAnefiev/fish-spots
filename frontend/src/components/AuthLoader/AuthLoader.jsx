import LoadingDots from './LoadingDots';

export default function AuthLoader() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-100 px-4">
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-10 max-w-xs w-full">
                <img
                    src="/favicon.ico"
                    alt="Logo"
                    className="w-16 h-16 mb-6 animate-pulse scale-105"
                />
                <div className="text-gray-700 text-xl font-semibold mb-2 flex items-center">
                    Удостоверяване
                    <LoadingDots />
                </div>
                <p className="text-gray-500 text-center text-sm leading-relaxed">
                    Моля, изчакайте.
                </p>
            </div>
        </div>
    );
}
