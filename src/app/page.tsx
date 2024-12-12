import prisma from '@/lib/db';
import PostList from '../components/post-list'

export default async function Home() {
  const posts = await prisma.post.findMany();
  return (
    <main className="text-center pt-2 px-5">
     <h1 className="text-4xl md:text-5xl font-bold mb-2">All Blogs</h1>
     <div className="max-w-[750px] mx-auto leading-8">
      <PostList posts={posts}/>
     </div>
    </main>
  );
}
