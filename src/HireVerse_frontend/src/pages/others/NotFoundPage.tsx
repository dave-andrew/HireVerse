import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const nav = useNavigate();

    return (
        <div className="bg-signature-yellow flex h-screen w-screen flex-col place-items-center justify-center gap-8">
            <div className="flex flex-col justify-center gap-2 p-24">
                <div className="font-bebas text-8xl text-cyan-600">
                    Oops, 404 NOT FOUND!
                </div>
                <div className="text-xl font-bold">
                    Seems like you lost your way here!
                </div>
            </div>
            <button
                className="rounded-md border border-black px-6 py-3 text-2xl hover:bg-black
                hover:text-white"
                onClick={() => {
                    nav(-1);
                }}>
                Go back to dashboard!
            </button>
        </div>
    );
}
