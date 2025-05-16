import CommentItem from "./CommentItem";

const data = [
  {
    id: 1,
    name: "John Doe",
    comment: "This is a comment",
    replies: [
      {
        id: 2,
        name: "Jane Doe",
        comment: "This is a reply",
        replies: [],
      },
    ],
  },
  {
    id: 3,
    name: "Alice",
    comment: "This is another comment",
    replies: [
      {
        id: 4,
        name: "Bob",
        comment: "This is another reply",
        replies: [
          {
            id: 5,
            name: "Charlie",
            comment: "This is a nested reply",
            replies: [
              {
                id: 6,
                name: "Dave",
                comment: "This is a nested reply",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Eve",
    comment: "This is a third comment",
    replies: [
      {
        id: 8,
        name: "Frank",
        comment: "This is a third reply",
        replies: [],
      },
    ],
  },
];

const Comments = () => {
  return (
    <div className="w-full flex flex-col justify-start max-h-full bg-white shadow-md rounded-lg p-4 m-2">
      <h1 className="text-xl font-bold mb-4">Comments</h1>
      <ul className="overflow-y-scroll scrollbar-hide">
        {data.map((comment) => (
          <CommentItem key={comment.id} data={comment} />
        ))}
      </ul>
    </div>
  );
};

export default Comments;
