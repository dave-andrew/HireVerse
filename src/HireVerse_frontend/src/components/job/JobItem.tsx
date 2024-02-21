export default function JobItem() {
    return (
        <div
            className={
                "flex flex-col p-4 transition rounded-xl hover:bg-gray-200"
            }>
            <div className={"flex flex-row items-center"}>
                <img
                    width={"50rem"}
                    height={"auto"}
                    className={"aspect-square"}
                    src={
                        "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png"
                    }
                />
                <span className={"font-bold"}>BINUS University</span>
            </div>
            <div className={"text-xl font-bold"}>
                Software Laboratory Assistant
            </div>
            <div>Jakarta, Indonesia</div>
            <div>Rp. 5.000.000 - Rp. 10.000.000</div>
        </div>
    );
}
