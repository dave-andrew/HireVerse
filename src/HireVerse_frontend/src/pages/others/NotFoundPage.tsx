export default function NotFoundPage() {
    return (
        <div className="h-screen w-screen bg-signature-yellow flex flex-col gap-8 place-items-center justify-center">
            <div className="flex flex-col gap-2 p-24 justify-center">
                <div className="text-8xl font-bebas text-cyan-600">Oops, 404 NOT FOUND!</div>
                <div className="text-xl font-bold"> Seems like you lost your way here!</div>
            </div>
            <a href="/">
                <button className="px-6 py-3 text-2xl border border-black rounded-md hover:bg-black
                hover:text-white">Go back to dashboard!
                </button>
            </a>

        </div>
    )
}