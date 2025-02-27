function Polaroid({src, index, author}){
    return(
        <>
            <div className=" bg-white drop-shadow-sm hover:drop-shadow-lg p-5 pb-10  w-96 m-auto ">
                <img src={src} alt="" key={index}  className="aspect-square object-cover"/>
                <p className="py-5"> Author: {author}</p>
            </div>
        </>
    )
}

export default Polaroid