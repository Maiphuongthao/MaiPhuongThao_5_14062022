export class Book {
    constructor(title, author, description, pages, currentPage, read){
      this.title = title;
      this.author = author;
      this.description = description;
      this.pages = pages;
      this.currentPage = currentPage;
      this.read = true;
    }
   readBook(page){
  console.log("This is page " + this.currentPage );
  
  if( page < 1 || page > this.pages){
    return 0;
  
  } else if(page >=1 && page < this.pages){
    console.log("This is page " + this.currentPage);
    this.currentPage = page;
    return 1;
} else if(page === this.pages){
    console.log("finish reading");
    this.currentPage = this.pages;
    this.read = true;
    return 1;
  }
  
    }
  }
  
  let Book1 = new Book(title = "love",
      author = "Thao",
      description = "love story",
      pages = 40,
      currentPage = 0,
      read = false,);
  
  let Book2 =new Book(
      title = "hate",
      author = "Thao",
      description = "hate story",
      pages = 10,
      currentPage = 0,
      read = false,
  );
    
  let Book3 = new Book(
      title = "eat",
      author = "Thao",
      description = "eat story",
      pages = 20,
      currentPage = 0,
      read = false,
  );
  export const books = new Book[Book1, Book2, Book3];
  