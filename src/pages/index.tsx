import axios from "axios";
import { dehydrate } from "react-query/hydration";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

const url = "https://jsonplaceholder.typicode.com/posts";
const get = async () => {
  const { data } = await axios.get(url);
  return data;
};
const remove = async (id) => await axios.delete(`${url}/${id}`);
export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("POSTS_LIST", get);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
const Posts = () => {
  const client = useQueryClient();
  const { data } = useQuery("POSTS_LIST", get);
  const { mutate } = useMutation(remove, {
    onSuccess: () => client.invalidateQueries("POSTS_LIST"),
  });
  return (
    <ul>
      {(data || []).map((post) => (
        <li
          key={post.id}
          onClick={() => mutate(post.id)}
          className="bg-red-400 p-2 rounded cursor-pointer my-2"
        >
          {post.title}
        </li>
      ))}
    </ul>
  );
};
export default Posts;
