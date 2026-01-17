import React from "react";

const Pagination = ({pages, totalPages, onChangePage}) =>{
    const renderPageNumbers = () =>{
        const pageNumbers = [];
        const maxPages = 5;
        const halfMaxPages = Math.floor(maxPages/2);

        let startPages = Math.max(1, pages - halfMaxPages);
        let endPages = Math.min(totalPages, pages + halfMaxPages);

        if(pages <= halfMaxPages){
            endPages = Math.min(totalPages, maxPages);
        }
        if(totalPages <= pages + halfMaxPages){
            startPages = Math.max(1, totalPages - maxPages + 1)
        }
        
        //bouton1 + elipse du début
        if(startPages > 1){
            pageNumbers.push(
                <button key={1} onClick={() =>onChangePage(1)} className={`px-3 py-1 sm:px-4 sm:py-2 mx-1 rounded-lg ${1 === pages 
                    ? "bg-purple-500 text-white hover:bg-purple-800" : "bg-gray-300 text-black hover:bg-gray-400"}`}>1</button>
            );
        }
        if(startPages > 2){
            pageNumbers.push(
                <span key="start-ellipsis" className="text-gray-500 px-1 mx-1 px-2 sm:px-4 text-lg font-bold">...</span>
            );
        }

        //bouton centrale de pages
        for(let i = startPages; i<=endPages; i++){
            pageNumbers.push(
                <button key={i} onClick={() =>onChangePage(i)} className={`px-3 py-1 sm:px-4 sm:py-2 mx-1 rounded-lg ${i === pages 
                    ? "bg-purple-500 text-white hover:bg-purple-800" : "bg-gray-300 text-black hover:bg-gray-400"}`}>{i}</button>
            );
        }
        //dernier bouton + elipse
        if(endPages < totalPages){
            if(endPages < totalPages - 1){
                pageNumbers.push(
                <span key="start-ellipsis" className="text-gray-500 px-1 mx-1 px-2 sm:px-4 text-lg font-bold">...</span>
            );
            }
        }

       if(endPages < totalPages){
         pageNumbers.push(
            <button key={totalPages} onClick={() =>onChangePage(totalPages)} className={`px-3 py-1 sm:px-4 sm:py-2 mx-1 rounded-lg ${totalPages === pages 
                    ? "bg-purple-500 text-white hover:bg-purple-800" : "bg-gray-300 text-black hover:bg-gray-400"}`}>{totalPages}</button>
        );
       }
        return pageNumbers;
    };

    return <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
            {/*bouton précédent*/}
            <button disabled={pages === 1} onClick={() =>onChangePage(pages - 1)} 
                className="bg-purple-500 text-white px-3 py-1 sm:px-4 sm:py-2 hover:bg-purple-800 rounded-md font-semibold">Précédent</button>
            {/*numéro des pages*/}
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {renderPageNumbers()}
            </div>
            {/*bouton suivant */}
            <button disabled={pages === totalPages} onClick={() =>onChangePage(pages + 1)} 
                className="bg-purple-500 text-white px-3 py-1 sm:px-4 sm:py-2 hover:bg-purple-800 rounded-md font-semibold">Suivant</button>
    </div>
    };

export default Pagination;