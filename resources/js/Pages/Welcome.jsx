import {Link, Head, router} from '@inertiajs/react';
import {useState} from "react";
import ExcelImport from "@/Components/ExcelImport.jsx";

export default function Welcome({constants: initialConstants}) {
    // Step 1: Use useState to hold the constants state
    const [constants, setConstants] = useState(initialConstants);

    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    function handleConstantChange(e) {
        const {name, value} = e.target;

        // Update the state of the constant
        setConstants(prevConstants =>
            prevConstants.map(cons =>
                cons.id === parseInt(name) ? {...cons, value: Number(value)} : cons
            )
        );
    }

    function handleConstantBlur(e) {
        e.preventDefault();
        router.post('/constant', {
            id: e.target.name,
            value: Number(e.target.value),
        })
    }

    return (
        <>
            <Head title="Welcome"/>
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />
                <div
                    className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">


                        </header>

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                <div
                                    id="docs-card"
                                    className="flex flex-col w-[100%] items-end gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    {constants && constants.length > 0 && constants.map(cons => <div key={cons.id}
                                                                                                     dir="rtl"
                                                                                                     className="flex items-center w-[100%] justify-between">
                                        <span>{cons.title}</span><input name={cons.id}
                                                                        value={cons.value}
                                                                        onChange={e => handleConstantChange(e)} // Handle the change on input
                                                                        onBlur={e => handleConstantBlur(e)}
                                                                        className="text-black form-input"
                                                                        type="number"
                                                                        placeholder={cons.value.toLocaleString()}/>
                                    </div>)}
                                </div>
                               <ExcelImport />

                            </div>

                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">

                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
