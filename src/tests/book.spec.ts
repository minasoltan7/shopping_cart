import {BookModel, Book} from "../models/orders";

const my_book=new BookModel()

describe("testing if methods exist",()=>{
    it("testing if index method exist",()=>{
        expect(my_book.index).toBeDefined()
    })
    it('index method should return a list of books', async () => {
        const result = await my_book.index();
        expect(result).toEqual([{
          id: 1 ,
          title: 'hi',
          total_pages: 56,
          author: 'mina',
          type: 'commedy',
          summary:"no"
        }]);
      });
})
