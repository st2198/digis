import React from 'react';

export const TableWithPagination = ({
    loos,
    isActive,
    currentPage,
    handleNextPageClick,
    handlePrevPageClick,
    onLooSelect,
    onActiveFilter,
    onNotActiveFilter,
}: any) => {


    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div className="inline-flex rounded-md shadow-sm text-sm" role="group">
                    <button disabled={isActive} onClick={onActiveFilter} className={`${isActive ? 'bg-gray-300' : 'bg-white dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-100 hover:text-gray-900'} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-gray-300 rounded-s-lg dark:border-gray-700 dark:text-gray-700`}>Active</button>
                    <button disabled={!isActive} onClick={onNotActiveFilter} className={`${!isActive ? 'bg-gray-300' : 'bg-white dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-100 hover:text-gray-900'} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-gray-300 rounded-e-lg dark:border-gray-700 dark:text-gray-700`}>Not active</button>
                </div>

            </div>
            <table className="rounded-md w-full text-sm text-left rtl:text-right text-gray-700 ">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Tool name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loos.map((l: any) => (
                        <tr key={l.id} className="bg-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                            <td className="px-6 py-4">
                                {l.name}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => onLooSelect(l.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show</button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <button disabled={currentPage <= 1} onClick={handlePrevPageClick} className={`${currentPage <= 1 ? 'bg-gray-300' : 'bg-white dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-100 hover:text-gray-900'} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-gray-300 rounded-s-lg dark:border-gray-700 dark:text-gray-700`}>Previous</button>
                    </li>
                    <li>
                        <button onClick={handleNextPageClick} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                    </li>
                </ul>
            </nav>
        </div>

    );
};
