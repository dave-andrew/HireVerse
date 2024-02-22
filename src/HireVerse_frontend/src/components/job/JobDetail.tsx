import CardLayout from "../../layouts/CardLayout";

export default function JobDetail() {
    return (
        <CardLayout className="h-full relative">
            <div className="absolute h-32 w-full flex flex-row items-center border-b-[1px] border-signature-gray">
                <img
                    className="w-48"
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png"
                    alt="BINUS University"
                />
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl">
                        Junior Laboratory Assistant
                    </h1>
                    <p className="text-base">Jakarta, Indonesia</p>
                </div>
            </div>
            <div className="h-32" />
            <div className="flex flex-col p-6 [&_h3]:font-bold [&_h3]:text-base gap-8  overflow-auto">
                <div>
                    <h3>BINUS University</h3>
                    <p>Start applying by contacting: recruitment@binus.edu</p>
                </div>
                <div>
                    <h3>Salary</h3>
                    <p>Rp. 5.000.000 - Rp. 10.000.000</p>
                </div>
                <div>
                    <h3>Job Description</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed
                    </p>
                </div>
                <div>
                    <h3>Requirements</h3>
                    <ul>
                        <li>
                            Bachelor's degree in Computer Science or related
                            field
                        </li>
                        <li>1+ years of experience in software development</li>
                        <li>Strong knowledge in Java, Python, and C++</li>
                        <li>
                            Strong knowledge in data structures and algorithms
                        </li>
                        <li>Strong knowledge in software testing</li>
                        <li>Strong knowledge in software documentation</li>
                        <li>Strong knowledge in software deployment</li>
                        <li>Strong knowledge in software maintenance</li>
                        <li>
                            Strong knowledge in software development
                            methodologies
                        </li>
                        <li>Strong knowledge in software development tools</li>
                        <li>
                            Strong knowledge in software development frameworks
                        </li>
                    </ul>
                </div>
            </div>
        </CardLayout>
    );
}
