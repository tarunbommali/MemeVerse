type CommentData = {
  id: string | number;
  name: string;
  comment: string;
  replies?: CommentData[];
};

type CommentItemProps = {
  data: CommentData;
};
const CommentItem = ({ data }: CommentItemProps) => {
  return (
    <div className="mb-2">
      <div className="bg-gray-100 p-2 rounded">
        <p className="font-semibold">{data.name}</p>
        <p>{data.comment}</p>
      </div>

      {data.replies && data.replies.length > 0 && (
        <div className="ml-4 border-l-2 border-gray-300 pl-4 mt-2">
          {data.replies.map((reply) => (
            <CommentItem key={reply.id} data={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
