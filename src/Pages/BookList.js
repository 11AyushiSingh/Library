import Book from "./Book";
function BookList({videos,deleteBook,editBook}){
    
    return(
        <>
         <div className="grid-container">
        {videos.map(video=><Book 
                 key = {video.id}
                 id = {video.id}
                 Image = {video.Image}
                 Name = {video.Name}
                 Author = {video.Author}
                 Publisher = {video.Publisher}
                 Availability = {video.Availability}
                 Ledger = {video.Ledger}
                 deleteBook = {deleteBook}
                 editBook={editBook}
                 >

                 </Book>)}
                 </div>
        </>
    )
}
export default BookList;