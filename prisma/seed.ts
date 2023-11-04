import { db } from "../src/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

function getAuthors(): Array<Author> {
  return [
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "William",
      lastName: "Shakespear",
    },
    {
      firstName: "Noah",
      lastName: "Harrari",
    },
  ];
}

function getBooks(): Array<Book> {
  return [
    {
      title: "Sapians",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "Dues",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "ugly duckling",
      isFiction: true,
      datePublished: new Date(),
    },
  ];
}

const seed = async () => {
  await Promise.all(
    getAuthors().map(async (author) => {
      await db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );

  const author = await db.author.findFirst({
    where: {
      firstName: "Noah",
    },
  });

  if (author) {
    await Promise.all(
      getBooks().map((book) => {
        const { title, isFiction, datePublished } = book;
        return db.book.create({
          data: {
            title,
            isFiction,
            datePublished,
            authorId: author.id!, // Non-null assertion
          },
        });
      })
    );
  } else {
    console.log("Author not found.");
  }
};

seed();
