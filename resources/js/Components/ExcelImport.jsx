import {router} from "@inertiajs/react";
import {useState} from 'react';

export default function ExcelImport() {
    const [calculatedData, setCalculatedData] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        const fileInput = e.target.excel.files[0]; // Get the selected file
        formData.append('excel', fileInput); // Append the file to FormData

        router.post('/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }, onSuccess: (response) => {
                setCalculatedData(response.props.data);
            }
        });
    }
    function handleDownload(){
        window.location.href = '/download';
    }

    return <div
        id="docs-card"
        className="flex flex-col w-[100%] items-center gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
    >

        <button type="button" className="p-2 ms-2 border rounded ring-1 " onClick={handleDownload}>Download Excel Template</button>
        <h1 className="text-center">Import Excel</h1>
        <form onSubmit={handleSubmit}>
            <label hidden={true} className="required" htmlFor="excel">Import the time table</label>
            <input id="excel" type="file" name="excel" required={true}
                   accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
            <button type="submit" className="p-2 ms-2 border rounded ring-1 ">Import</button>
        </form>
        <div>
            {calculatedData.length > 0 && calculatedData.map((item, index) => <div key={index}>
                <span>{item.label}</span><span>{item.value}</span>
            </div>)}
        </div>
    </div>
}
