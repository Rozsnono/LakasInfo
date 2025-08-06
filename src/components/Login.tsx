import Card from "./ui/Card";

export default function Login() {
    return (
        <main className="top-0 left-0 fixed h-screen w-screen flex items-center justify-center">
            <Card className="max-w-fit">
                <div className="flex flex-col items-center gap-4 py-8 p-4 shadow-lg bg-gray-800 rounded-lg">
                    <h1 className="text-2xl font-bold px-4">Welcome to LakasInfo</h1>
                    {/* Add your login form or button here */}
                    <hr className="w-full border-gray-300" />
                    <form action="" className="w-full flex flex-col gap-4">
                        <div className="w-full">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name"></input>
                        </div>

                        <div className="w-full">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com"></input>
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Login</button>
                    </form>
                </div>
            </Card>
        </main>
    )
}